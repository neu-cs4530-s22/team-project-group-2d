import { Schema } from 'mongoose';
import ServerBulletinBoard from './BulletinBoard';
import BulletinPost from './BulletinPost';

function createBulletinPost(title: string, date: Date) : BulletinPost {
  return new BulletinPost(new Schema.Types.ObjectId('id1'), '', title, '', date, '');
}

describe('BulletinBoard', () => {
  let bulletinBoard: ServerBulletinBoard;
  beforeEach(() => {
    bulletinBoard = new ServerBulletinBoard();
  });
  it('should add a post to the bulletin board', () => {
    const bulletinBoard2 = new ServerBulletinBoard();
    const post1 = createBulletinPost('post1', new Date());
    const post2 = createBulletinPost('post2', new Date());
    const post3 = createBulletinPost('post3', new Date());

    bulletinBoard.addPost(post1);
    expect(bulletinBoard.posts.length).toBe(1);
    bulletinBoard.addPost(post2);
    expect(bulletinBoard.posts.length).toBe(2);
    bulletinBoard2.addPost(post3);
    expect(bulletinBoard.posts.length).toBe(2);
    expect(bulletinBoard2.posts.length).toBe(1);

    expect(bulletinBoard.posts[0].title).toBe('post1');
    expect(bulletinBoard.posts[1].title).toBe('post2');
    expect(bulletinBoard2.posts[0].title).toBe('post3');
  });
  it('should sort the bulletin posts newest to oldest', () => {
    const post1 = createBulletinPost('post1', new Date(2022, 2, 6, 1));
    const post2 = createBulletinPost('post2', new Date(2022, 1, 3, 4));
    const post3 = createBulletinPost('post3', new Date(2022, 3, 5, 4));

    bulletinBoard.addPost(post1);
    bulletinBoard.addPost(post2);
    bulletinBoard.addPost(post3);
    expect(bulletinBoard.posts.length).toBe(3);

    expect(bulletinBoard.posts[0].title).toBe('post1');
    expect(bulletinBoard.posts[1].title).toBe('post2');
    expect(bulletinBoard.posts[2].title).toBe('post3');

    bulletinBoard.sortPostsByTime();
    expect(bulletinBoard.posts.length).toBe(3);
    expect(bulletinBoard.posts[0].title).toBe('post3');
    expect(bulletinBoard.posts[1].title).toBe('post1');
    expect(bulletinBoard.posts[2].title).toBe('post2');
  });
});

