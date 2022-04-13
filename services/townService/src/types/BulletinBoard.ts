import ServerBulletinPost from './BulletinPost';

export default class ServerBulletinBoard {
  private _posts: ServerBulletinPost[] = [];

  get posts(): ServerBulletinPost[] {
    return this._posts;
  }

  isEmpty(): boolean {
    return this._posts.length === 0;
  }

  addPost(post: ServerBulletinPost): void {
    this._posts.push(post);
  }

  deletePosts(postsToDelete: ServerBulletinPost[]): void {
    this._posts = this._posts.filter(post => !postsToDelete.includes(post));
  }

  sortPostsByTime(): void {
    this._posts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}
