import BoundingBox from './BoundingBox';
import BulletinPost from './BulletinPost';

export default class BulletinBoard {
  private _posts: BulletinPost[] = [];

  private _boundingBox: BoundingBox;

  constructor(boundingBox: BoundingBox) {
    this._boundingBox = boundingBox;
  }

  get posts() {
    return this._posts;
  }

  isEmpty(): boolean {
    return this._posts.length === 0;
  }

  getBoundingBox(): BoundingBox {
    return this._boundingBox;
  }

  addPost(post: BulletinPost) {
      this._posts.push(post);
  }

  sortPostsByTime() {
    this._posts.sort((a, b) => a.creationTime - b.creationTime);
  }
}
