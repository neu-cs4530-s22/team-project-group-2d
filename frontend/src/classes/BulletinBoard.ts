import BulletinPost from './BulletinPost';

export default class BulletinBoard {
  private _posts: BulletinPost[] = [];

  get posts() {
    return this._posts;
  }

  isEmpty(): boolean {
    return this._posts.length === 0;
  }

  addPost(post: BulletinPost) {
    this._posts.push(post);
  }

  sortPostsByTime() {
    this._posts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}
