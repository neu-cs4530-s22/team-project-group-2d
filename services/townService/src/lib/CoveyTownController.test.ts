import { mock, mockDeep, mockReset } from 'jest-mock-extended';
import { nanoid } from 'nanoid';
import { Socket } from 'socket.io';
import * as TestUtils from '../client/TestUtils';
import { PostCreateRequest } from '../client/TownsServiceClient';
import { UserLocation } from '../CoveyTypes';
import { townSubscriptionHandler } from '../requestHandlers/CoveyTownRequestHandlers';
import CoveyTownListener from '../types/CoveyTownListener';
import Player from '../types/Player';
import PlayerSession from '../types/PlayerSession';
import CoveyTownController from './CoveyTownController';
import CoveyTownsStore from './CoveyTownsStore';
import TwilioVideo from './TwilioVideo';

const mockTwilioVideo = mockDeep<TwilioVideo>();
jest.spyOn(TwilioVideo, 'getInstance').mockReturnValue(mockTwilioVideo);

function generateTestLocation(): UserLocation {
  return {
    rotation: 'back',
    moving: Math.random() < 0.5,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
  };
}

describe('CoveyTownController', () => {
  beforeEach(() => {
    mockTwilioVideo.getTokenForTown.mockClear();
  });
  it('constructor should set the friendlyName property', () => {
    const townName = `FriendlyNameTest-${nanoid()}`;
    const townController = new CoveyTownController(townName, false);
    expect(townController.friendlyName).toBe(townName);
  });
  it('constructor should create an empty bulletin board', () => {
    const townName = `FriendlyNameTest-${nanoid()}`;
    const townController = new CoveyTownController(townName, false);
    expect(townController.bulletinBoard.isEmpty()).toBe(true);
  });
  describe('addPlayer', () => {
    it('should use the coveyTownID and player ID properties when requesting a video token', async () => {
      const townName = `FriendlyNameTest-${nanoid()}`;
      const townController = new CoveyTownController(townName, false);
      const newPlayerSession = await townController.addPlayer(new Player(nanoid()));
      expect(mockTwilioVideo.getTokenForTown).toBeCalledTimes(1);
      expect(mockTwilioVideo.getTokenForTown).toBeCalledWith(
        townController.coveyTownID,
        newPlayerSession.player.id,
      );
    });
  });
  describe('town listeners and events', () => {
    let testingTown: CoveyTownController;
    const mockListeners = [
      mock<CoveyTownListener>(),
      mock<CoveyTownListener>(),
      mock<CoveyTownListener>(),
    ];
    beforeEach(() => {
      const townName = `town listeners and events tests ${nanoid()}`;
      testingTown = new CoveyTownController(townName, false);
      mockListeners.forEach(mockReset);
    });
    it('should notify added listeners of player movement when updatePlayerLocation is called', async () => {
      const player = new Player('test player');
      await testingTown.addPlayer(player);
      const newLocation = generateTestLocation();
      mockListeners.forEach(listener => testingTown.addTownListener(listener));
      testingTown.updatePlayerLocation(player, newLocation);
      mockListeners.forEach(listener => expect(listener.onPlayerMoved).toBeCalledWith(player));
    });
    it('should notify added listeners of player disconnections when destroySession is called', async () => {
      const player = new Player('test player');
      const session = await testingTown.addPlayer(player);

      mockListeners.forEach(listener => testingTown.addTownListener(listener));
      testingTown.destroySession(session);
      mockListeners.forEach(listener =>
        expect(listener.onPlayerDisconnected).toBeCalledWith(player),
      );
    });
    it('should notify added listeners of new players when addPlayer is called', async () => {
      mockListeners.forEach(listener => testingTown.addTownListener(listener));

      const player = new Player('test player');
      await testingTown.addPlayer(player);
      mockListeners.forEach(listener => expect(listener.onPlayerJoined).toBeCalledWith(player));
    });
    it('should notify added listeners that the town is destroyed when disconnectAllPlayers is called', async () => {
      const player = new Player('test player');
      await testingTown.addPlayer(player);

      mockListeners.forEach(listener => testingTown.addTownListener(listener));
      testingTown.disconnectAllPlayers();
      mockListeners.forEach(listener => expect(listener.onTownDestroyed).toBeCalled());
    });
    it('should not notify removed listeners of player movement when updatePlayerLocation is called', async () => {
      const player = new Player('test player');
      await testingTown.addPlayer(player);

      mockListeners.forEach(listener => testingTown.addTownListener(listener));
      const newLocation = generateTestLocation();
      const listenerRemoved = mockListeners[1];
      testingTown.removeTownListener(listenerRemoved);
      testingTown.updatePlayerLocation(player, newLocation);
      expect(listenerRemoved.onPlayerMoved).not.toBeCalled();
    });
    it('should not notify removed listeners of player disconnections when destroySession is called', async () => {
      const player = new Player('test player');
      const session = await testingTown.addPlayer(player);

      mockListeners.forEach(listener => testingTown.addTownListener(listener));
      const listenerRemoved = mockListeners[1];
      testingTown.removeTownListener(listenerRemoved);
      testingTown.destroySession(session);
      expect(listenerRemoved.onPlayerDisconnected).not.toBeCalled();
    });
    it('should not notify removed listeners of new players when addPlayer is called', async () => {
      const player = new Player('test player');

      mockListeners.forEach(listener => testingTown.addTownListener(listener));
      const listenerRemoved = mockListeners[1];
      testingTown.removeTownListener(listenerRemoved);
      const session = await testingTown.addPlayer(player);
      testingTown.destroySession(session);
      expect(listenerRemoved.onPlayerJoined).not.toBeCalled();
    });

    it('should not notify removed listeners that the town is destroyed when disconnectAllPlayers is called', async () => {
      const player = new Player('test player');
      await testingTown.addPlayer(player);

      mockListeners.forEach(listener => testingTown.addTownListener(listener));
      const listenerRemoved = mockListeners[1];
      testingTown.removeTownListener(listenerRemoved);
      testingTown.disconnectAllPlayers();
      expect(listenerRemoved.onTownDestroyed).not.toBeCalled();
    });
  });
  describe('townSubscriptionHandler', () => {
    const mockSocket = mock<Socket>();
    let testingTown: CoveyTownController;
    let player: Player;
    let session: PlayerSession;
    beforeEach(async () => {
      const townName = `connectPlayerSocket tests ${nanoid()}`;
      testingTown = CoveyTownsStore.getInstance().createTown(townName, false);
      mockReset(mockSocket);
      player = new Player('test player');
      session = await testingTown.addPlayer(player);
    });
    afterAll(() => {
      CoveyTownsStore.getInstance().deleteScheduler.stop();
    });
    it('should reject connections with invalid town IDs by calling disconnect', async () => {
      TestUtils.setSessionTokenAndTownID(nanoid(), session.sessionToken, mockSocket);
      townSubscriptionHandler(mockSocket);
      expect(mockSocket.disconnect).toBeCalledWith(true);
    });
    it('should reject connections with invalid session tokens by calling disconnect', async () => {
      TestUtils.setSessionTokenAndTownID(testingTown.coveyTownID, nanoid(), mockSocket);
      townSubscriptionHandler(mockSocket);
      expect(mockSocket.disconnect).toBeCalledWith(true);
    });
    describe('with a valid session token', () => {
      it('should add a town listener, which should emit "newPlayer" to the socket when a player joins', async () => {
        TestUtils.setSessionTokenAndTownID(
          testingTown.coveyTownID,
          session.sessionToken,
          mockSocket,
        );
        townSubscriptionHandler(mockSocket);
        await testingTown.addPlayer(player);
        expect(mockSocket.emit).toBeCalledWith('newPlayer', player);
      });
      it('should add a town listener, which should emit "playerMoved" to the socket when a player moves', async () => {
        TestUtils.setSessionTokenAndTownID(
          testingTown.coveyTownID,
          session.sessionToken,
          mockSocket,
        );
        townSubscriptionHandler(mockSocket);
        testingTown.updatePlayerLocation(player, generateTestLocation());
        expect(mockSocket.emit).toBeCalledWith('playerMoved', player);
      });
      it('should add a town listener, which should emit "playerDisconnect" to the socket when a player disconnects', async () => {
        TestUtils.setSessionTokenAndTownID(
          testingTown.coveyTownID,
          session.sessionToken,
          mockSocket,
        );
        townSubscriptionHandler(mockSocket);
        testingTown.destroySession(session);
        expect(mockSocket.emit).toBeCalledWith('playerDisconnect', player);
      });
      it('should add a town listener, which should emit "townClosing" to the socket and disconnect it when disconnectAllPlayers is called', async () => {
        TestUtils.setSessionTokenAndTownID(
          testingTown.coveyTownID,
          session.sessionToken,
          mockSocket,
        );
        townSubscriptionHandler(mockSocket);
        testingTown.disconnectAllPlayers();
        expect(mockSocket.emit).toBeCalledWith('townClosing');
        expect(mockSocket.disconnect).toBeCalledWith(true);
      });
      describe('when a socket disconnect event is fired', () => {
        it('should remove the town listener for that socket, and stop sending events to it', async () => {
          TestUtils.setSessionTokenAndTownID(
            testingTown.coveyTownID,
            session.sessionToken,
            mockSocket,
          );
          townSubscriptionHandler(mockSocket);

          // find the 'disconnect' event handler for the socket, which should have been registered after the socket was connected
          const disconnectHandler = mockSocket.on.mock.calls.find(call => call[0] === 'disconnect');
          if (disconnectHandler && disconnectHandler[1]) {
            disconnectHandler[1]();
            const newPlayer = new Player('should not be notified');
            await testingTown.addPlayer(newPlayer);
            expect(mockSocket.emit).not.toHaveBeenCalledWith('newPlayer', newPlayer);
          } else {
            fail('No disconnect handler registered');
          }
        });
        it('should destroy the session corresponding to that socket', async () => {
          TestUtils.setSessionTokenAndTownID(
            testingTown.coveyTownID,
            session.sessionToken,
            mockSocket,
          );
          townSubscriptionHandler(mockSocket);

          // find the 'disconnect' event handler for the socket, which should have been registered after the socket was connected
          const disconnectHandler = mockSocket.on.mock.calls.find(call => call[0] === 'disconnect');
          if (disconnectHandler && disconnectHandler[1]) {
            disconnectHandler[1]();
            mockReset(mockSocket);
            TestUtils.setSessionTokenAndTownID(
              testingTown.coveyTownID,
              session.sessionToken,
              mockSocket,
            );
            townSubscriptionHandler(mockSocket);
            expect(mockSocket.disconnect).toHaveBeenCalledWith(true);
          } else {
            fail('No disconnect handler registered');
          }
        });
      });
      it('should forward playerMovement events from the socket to subscribed listeners', async () => {
        TestUtils.setSessionTokenAndTownID(
          testingTown.coveyTownID,
          session.sessionToken,
          mockSocket,
        );
        townSubscriptionHandler(mockSocket);
        const mockListener = mock<CoveyTownListener>();
        testingTown.addTownListener(mockListener);
        // find the 'playerMovement' event handler for the socket, which should have been registered after the socket was connected
        const playerMovementHandler = mockSocket.on.mock.calls.find(
          call => call[0] === 'playerMovement',
        );
        if (playerMovementHandler && playerMovementHandler[1]) {
          const newLocation = generateTestLocation();
          player.location = newLocation;
          playerMovementHandler[1](newLocation);
          expect(mockListener.onPlayerMoved).toHaveBeenCalledWith(player);
        } else {
          fail('No playerMovement handler registered');
        }
      });
    });
  });
  describe('addConversationArea', () => {
    let testingTown: CoveyTownController;
    beforeEach(() => {
      const townName = `addConversationArea test town ${nanoid()}`;
      testingTown = new CoveyTownController(townName, false);
    });
    it('should add the conversation area to the list of conversation areas', () => {
      const newConversationArea = TestUtils.createConversationForTesting();
      const result = testingTown.addConversationArea(newConversationArea);
      expect(result).toBe(true);
      const areas = testingTown.conversationAreas;
      expect(areas.length).toEqual(1);
      expect(areas[0].label).toEqual(newConversationArea.label);
      expect(areas[0].topic).toEqual(newConversationArea.topic);
      expect(areas[0].boundingBox).toEqual(newConversationArea.boundingBox);
    });
  });
  describe('updatePlayerLocation', () => {
    let testingTown: CoveyTownController;
    beforeEach(() => {
      const townName = `updatePlayerLocation test town ${nanoid()}`;
      testingTown = new CoveyTownController(townName, false);
    });
    it("should respect the conversation area reported by the player userLocation.conversationLabel, and not override it based on the player's x,y location", async () => {
      const newConversationArea = TestUtils.createConversationForTesting({
        boundingBox: { x: 10, y: 10, height: 5, width: 5 },
      });
      const result = testingTown.addConversationArea(newConversationArea);
      expect(result).toBe(true);
      const player = new Player(nanoid());
      await testingTown.addPlayer(player);

      const newLocation: UserLocation = {
        moving: false,
        rotation: 'front',
        x: 25,
        y: 25,
        conversationLabel: newConversationArea.label,
      };
      testingTown.updatePlayerLocation(player, newLocation);
      expect(player.activeConversationArea?.label).toEqual(newConversationArea.label);
      expect(player.activeConversationArea?.topic).toEqual(newConversationArea.topic);
      expect(player.activeConversationArea?.boundingBox).toEqual(newConversationArea.boundingBox);

      const areas = testingTown.conversationAreas;
      expect(areas[0].occupantsByID.length).toBe(1);
      expect(areas[0].occupantsByID[0]).toBe(player.id);
    });
    it('should emit an onConversationUpdated event when a conversation area gets a new occupant', async () => {
      const newConversationArea = TestUtils.createConversationForTesting({
        boundingBox: { x: 10, y: 10, height: 5, width: 5 },
      });
      const result = testingTown.addConversationArea(newConversationArea);
      expect(result).toBe(true);

      const mockListener = mock<CoveyTownListener>();
      testingTown.addTownListener(mockListener);

      const player = new Player(nanoid());
      await testingTown.addPlayer(player);
      const newLocation: UserLocation = {
        moving: false,
        rotation: 'front',
        x: 25,
        y: 25,
        conversationLabel: newConversationArea.label,
      };
      testingTown.updatePlayerLocation(player, newLocation);
      expect(mockListener.onConversationAreaUpdated).toHaveBeenCalledTimes(1);
    });
  });
  describe('addBulletinPost', () => {
    let testingTown: CoveyTownController;
    let defaultRequest: PostCreateRequest;
    beforeEach(() => {
      const townName = `addBulletinPost test town ${nanoid()}`;
      testingTown = new CoveyTownController(townName, false);
      defaultRequest = {
        title: 'title',
        text: 'text',
        author: 'author',
        coveyTownID: testingTown.coveyTownID,
      };
    });
    it('should not add a post to a town that does not exist', () => {
      defaultRequest.coveyTownID = 'invalid id';
      const result = testingTown.addBulletinPost(defaultRequest);
      expect(result).toBeUndefined();
    });
    it('should not add a post with an empty title', () => {
      defaultRequest.title = '';
      const result = testingTown.addBulletinPost(defaultRequest);
      expect(result).toBeUndefined();
    });
    it('should not add a post with an empty author', () => {
      defaultRequest.author = '';
      const result = testingTown.addBulletinPost(defaultRequest);
      expect(result).toBeUndefined();
    });
    it('should add a post to the town bulletin board and emit an onBulletinPostAdded', () => {
      const mockListener = mock<CoveyTownListener>();
      testingTown.addTownListener(mockListener);

      const result = testingTown.addBulletinPost(defaultRequest);
      const { posts } = testingTown.bulletinBoard;
      expect(posts.length).toBe(1);
      expect(posts[0].toBulletinPostSchema()).toEqual(result);
      expect(mockListener.onBulletinPostAdded).toBeCalledTimes(1);
    });
    it('should allow posts that have the same title, text, and author', () => {
      const mockListener = mock<CoveyTownListener>();
      testingTown.addTownListener(mockListener);

      const postOne = testingTown.addBulletinPost(defaultRequest);
      const postTwo = testingTown.addBulletinPost(defaultRequest);
      const { posts } = testingTown.bulletinBoard;
      expect(posts.length).toBe(2);
      expect(posts[0].toBulletinPostSchema()).toEqual(postOne);
      expect(posts[1].toBulletinPostSchema()).toEqual(postTwo);
      expect(mockListener.onBulletinPostAdded).toBeCalledTimes(2);
    });
  });
  describe('deleteBulletinPosts', () => {
    let testingTown: CoveyTownController;
    let defaultRequest: PostCreateRequest;
    beforeEach(() => {
      const townName = `addBulletinPost test town ${nanoid()}`;
      testingTown = new CoveyTownController(townName, false);
      defaultRequest = {
        title: 'title',
        text: 'text',
        author: 'author',
        coveyTownID: testingTown.coveyTownID,
      };
    });
    it('should not delete posts that have been posted within 24 hours', () => {
      const { posts } = testingTown.bulletinBoard;
      testingTown.addBulletinPost(defaultRequest);
      expect(posts.length).toBe(1);
      const result = testingTown.deleteBulletinPosts();
      expect(posts.length).toBe(1);
      expect(result).toBe(0);
    });
    it('should delete posts that have been posted at least 24 hours ago', () => {
      let { posts } = testingTown.bulletinBoard;
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(2020, 3, 1));
      testingTown.addBulletinPost(defaultRequest);
      jest.useRealTimers();
      expect(posts.length).toBe(1);
      const result = testingTown.deleteBulletinPosts();
      posts = testingTown.bulletinBoard.posts;
      expect(posts.length).toBe(0);
      expect(result).toBe(1);
    });
    it('should delete posts that have been posted exactly 24 hours + 1 millisecond ago', () => {
      let { posts } = testingTown.bulletinBoard;
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.now() - 3600 * 1000 * 24 - 1));
      testingTown.addBulletinPost(defaultRequest);
      jest.useRealTimers();
      expect(posts.length).toBe(1);
      const result = testingTown.deleteBulletinPosts();
      posts = testingTown.bulletinBoard.posts;
      expect(posts.length).toBe(0);
      expect(result).toBe(1);
    });
    it('should not delete posts that have been posted exactly 24 hours - 1 milliseconds ago', () => {
      let { posts } = testingTown.bulletinBoard;
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(Date.now() - 3600 * 1000 * 24 + 1));
      testingTown.addBulletinPost(defaultRequest);
      jest.useRealTimers();
      expect(posts.length).toBe(1);
      const result = testingTown.deleteBulletinPosts();
      posts = testingTown.bulletinBoard.posts;
      expect(posts.length).toBe(1);
      expect(result).toBe(0);
    });
    it('should delete all posts that have been posted at least 24 hours ago', () => {
      let { posts } = testingTown.bulletinBoard;
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(2020, 3, 1));
      testingTown.addBulletinPost(defaultRequest);
      testingTown.addBulletinPost(defaultRequest);
      testingTown.addBulletinPost(defaultRequest);
      jest.useRealTimers();
      testingTown.addBulletinPost(defaultRequest);
      expect(posts.length).toBe(4);
      const result = testingTown.deleteBulletinPosts();
      posts = testingTown.bulletinBoard.posts;
      expect(posts.length).toBe(1);
      expect(result).toBe(3);
    });
    it('should delete a post on the town bulletin board and emit an onBulletinDeleted', () => {
      const mockListener = mock<CoveyTownListener>();
      testingTown.addTownListener(mockListener);
      jest.useFakeTimers('modern');
      jest.setSystemTime(new Date(2020, 3, 1));
      testingTown.addBulletinPost(defaultRequest);
      jest.useRealTimers();
      let { posts } = testingTown.bulletinBoard;
      expect(posts.length).toBe(1);
      testingTown.deleteBulletinPosts();
      posts = testingTown.bulletinBoard.posts;
      expect(posts.length).toBe(0);
      expect(mockListener.onBulletinPostsDeleted).toBeCalledTimes(1);
    });
    it('should not delete a post on the town bulletin board and not emit an onBulletinDeleted if no posts are deleted', () => {
      const mockListener = mock<CoveyTownListener>();
      testingTown.addTownListener(mockListener);
      testingTown.addBulletinPost(defaultRequest);
      let { posts } = testingTown.bulletinBoard;
      expect(posts.length).toBe(1);
      testingTown.deleteBulletinPosts();
      posts = testingTown.bulletinBoard.posts;
      expect(posts.length).toBe(1);
      expect(mockListener.onBulletinPostsDeleted).toBeCalledTimes(0);
    });
  });
});
