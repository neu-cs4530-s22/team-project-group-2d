import CORS from 'cors';
import Express from 'express';
import http from 'http';
import { nanoid } from 'nanoid';
import { AddressInfo } from 'net';
import CoveyTownsStore from '../lib/CoveyTownsStore';
import addPostRoutes from '../router/posts';
import addTownRoutes from '../router/towns';
import TownsServiceClient from './TownsServiceClient';

type TestTownData = {
  friendlyName: string;
  coveyTownID: string;
  isPubliclyListed: boolean;
  townUpdatePassword: string;
};

describe('PostsServiceAPIREST', () => {
  let server: http.Server;
  let apiClient: TownsServiceClient;

  async function createTownForTesting(
    friendlyNameToUse?: string,
    isPublic = false,
  ): Promise<TestTownData> {
    const friendlyName =
      friendlyNameToUse !== undefined
        ? friendlyNameToUse
        : `${isPublic ? 'Public' : 'Private'}TestingTown=${nanoid()}`;
    const ret = await apiClient.createTown({
      friendlyName,
      isPubliclyListed: isPublic,
    });
    return {
      friendlyName,
      isPubliclyListed: isPublic,
      coveyTownID: ret.coveyTownID,
      townUpdatePassword: ret.coveyTownPassword,
    };
  }

  beforeAll(async () => {
    const app = Express();
    app.use(CORS());
    server = http.createServer(app);

    addTownRoutes(server, app);
    addPostRoutes(app);
    await server.listen();
    const address = server.address() as AddressInfo;

    apiClient = new TownsServiceClient(`http://127.0.0.1:${address.port}`);
  });
  afterAll(async () => {
    CoveyTownsStore.getInstance().deleteScheduler.stop();
    await server.close();
  });
  describe('BulletinPostCreateAPI', () => {
    let testingTown: TestTownData;
    beforeEach(async () => {
      testingTown = await createTownForTesting(undefined, true);
    });
    it('prohibits a blank post title', async () => {
      try {
        await apiClient.createBulletinPost({
          title: '',
          text: 'text',
          author: 'author',
          coveyTownID: testingTown.coveyTownID,
        });
        fail('create post should throw an error if title is empty');
      } catch (err) {
        // OK
      }
    });
    it('prohibits a blank post text', async () => {
      try {
        await apiClient.createBulletinPost({
          title: 'title',
          text: '',
          author: 'author',
          coveyTownID: testingTown.coveyTownID,
        });
        fail('create post should throw an error if text is empty');
      } catch (err) {
        // OK
      }
    });
    it('prohibits a blank post author', async () => {
      try {
        await apiClient.createBulletinPost({
          title: 'title',
          text: 'text',
          author: '',
          coveyTownID: testingTown.coveyTownID,
        });
        fail('create post should throw an error if author is empty');
      } catch (err) {
        // OK
      }
    });
    it('prohibits a non-exist coveyTownID', async () => {
      try {
        await apiClient.createBulletinPost({
          title: 'title',
          text: 'text',
          author: 'author',
          coveyTownID: '123',
        });
        fail('create post should throw an error town IDs do not match');
      } catch (err) {
        // OK
      }
    });
    it('adds a post and sets a success response', async () => {
      const { post } = await apiClient.createBulletinPost({
        title: 'title',
        text: 'text',
        author: 'author',
        coveyTownID: testingTown.coveyTownID,
      });
      expect(post.title).toBe('title');
      expect(post.text).toBe('text');
      expect(post.author).toBe('author');
      expect(post.coveyTownID).toBe(testingTown.coveyTownID);
    });
  });
});
