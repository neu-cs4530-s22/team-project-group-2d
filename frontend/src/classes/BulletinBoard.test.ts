import ServerBulletinBoard from './BulletinBoard';
import BulletinPost from './BulletinPost';

function createBulletinPost(title: string) : BulletinPost {
  return new BulletinPost('id', 'author', title, 'text', new Date(), 'townID');
}

describe('BulletinBoard', () => {
  let bulletinBoard: ServerBulletinBoard;
  beforeEach(() => {
    bulletinBoard = new ServerBulletinBoard();
  });
  it('creates a bulletin board with an empty post list', () => {
    expect(bulletinBoard.posts.length).toBe(0);
    expect(bulletinBoard.isEmpty()).toBe(true);
  });
  it('adds posts to the bulletin board', () => {
    const bulletinBoard2 = new ServerBulletinBoard();
    const post1 = createBulletinPost('post1');
    const post2 = createBulletinPost('post2');
    const post3 = createBulletinPost('post3');

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
  it('sorts the bulletin posts newest to oldest', () => {
    const post1 = createBulletinPost('post1');
    bulletinBoard.addPost(post1);

    const post2 = createBulletinPost('post2');
    bulletinBoard.addPost(post2);

    const post3 = createBulletinPost('post3');
    bulletinBoard.addPost(post3);

    expect(bulletinBoard.posts.length).toBe(3);
    bulletinBoard.sortPostsByTime();
    const { posts } = bulletinBoard;
    expect(posts[0].title).toBe('post1');
    expect(posts[1].title).toBe('post2');
    expect(posts[2].title).toBe('post3');

    expect(posts[0].createdAt.getTime()).toBeLessThanOrEqual(posts[1].createdAt.getTime());
    expect(posts[1].createdAt.getTime()).toBeLessThanOrEqual(posts[2].createdAt.getTime());
  });
});

