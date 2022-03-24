import { BoundingBox } from '../client/TownsServiceClient';
import ServerBulletinPost from './BulletinPost';

export default class ServerBulletinBoard {
  private _posts: ServerBulletinPost[] = [];

  private _boundingBox: BoundingBox;

  constructor(boundingBox: BoundingBox) {
    this._boundingBox = boundingBox;
  }

  get posts(): ServerBulletinPost[] {
    return this._posts;
  }

  isEmpty(): boolean {
    return this._posts.length === 0;
  }

  getBoundingBox(): BoundingBox {
    return this._boundingBox;
  }

  addPost(post: ServerBulletinPost): void {
    this._posts.push(post);
  }

  sortPostsByTime(): void {
    this._posts.sort((a, b) => a.creationTime - b.creationTime);
  }
}
