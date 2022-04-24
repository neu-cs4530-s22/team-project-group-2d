import BulletinPost from './BulletinPost';

/**
 * Frontend class representation of a bulletin board. Contains a list of bulletin posts that can be accessed.
 */
export default class BulletinBoard {
  private _posts: BulletinPost[] = [];

  get posts() {
    return this._posts;
  }

  /**
   * Checks if bulletin board is empty
   * @returns boolean representing if there are no posts in the bulletin board
   */
  isEmpty(): boolean {
    return this._posts.length === 0;
  }

  /**
   * Function to add a post to the current bulletin board
   * @param post bulletin post to add to the bulletin board
   */
  addPost(post: BulletinPost) {
    this._posts.push(post);
  }

  /**
   * Function that sorts the bulletin posts in the board by time
   */
  sortPostsByTime() {
    this._posts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}
