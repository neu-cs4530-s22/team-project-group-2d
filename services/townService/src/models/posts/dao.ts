import PostModel from './model';
import ServerBulletinPost from '../../types/BulletinPost';

export async function createPost(post: ServerBulletinPost) : Promise<ServerBulletinPost> {
  const response: ServerBulletinPost = await PostModel.create(post);
  return response;
} 

// TODO change return type (mongo returns a boolean and number of objects deleted - would need to make a type)?
export async function deletePost(id: string) : Promise<void> {
  await PostModel.deleteOne({ id });
} 

export async function findPostById(id: string) : Promise<ServerBulletinPost | null> {
  const response: ServerBulletinPost | null = await PostModel.findOne({ id });
  return response;
} 

export async function findAllPosts() : Promise<ServerBulletinPost[]> {
  const response: ServerBulletinPost[] = await PostModel.find();
  return response;
} 

export async function findAllPostsInTown(townID: string) : Promise<ServerBulletinPost[]> {
  const response: ServerBulletinPost[] = await PostModel.find({ coveyTownID: townID });
  return response;
} 