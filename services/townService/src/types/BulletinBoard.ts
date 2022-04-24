import ServerBulletinPost from './BulletinPost';

/**
 * Each bulletin board in a town is represented by a ServerBulletinBoard object
 */
export default class ServerBulletinBoard {
  private _posts: ServerBulletinPost[] = [];

  get posts(): ServerBulletinPost[] {
    return this._posts;
  }

  /**
   * Checks if the bulletin board has no posts
   * 
   * @returns true if the board has no posts
   */
  isEmpty(): boolean {
    return this._posts.length === 0;
  }

  /**
   * Adds a new post to the bulletin board
   * 
   * @param post the post to add
   */
  addPost(post: ServerBulletinPost): void {
    this._posts.push(post);
  }

  /**
   * Deletes all provided posts from the bulletin board
   * 
   * @param postsToDelete list of all posts to delete
   */
  deletePosts(postsToDelete: ServerBulletinPost[]): void {
    this._posts = this._posts.filter(post => !postsToDelete.includes(post));
  }

  /**
   * Sorts posts in the bulletin board by time (newest to oldest)
   */
  sortPostsByTime(): void {
    this._posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
