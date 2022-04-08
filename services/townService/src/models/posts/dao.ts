import { BulletinPostSchema } from '../../types/BulletinPost';
import PostModel from './model';

export async function createPost(post: BulletinPostSchema) : Promise<BulletinPostSchema> {
  const response: BulletinPostSchema = await PostModel.create(post);
  return response;
} 

// TODO change return type (mongo returns a boolean and number of objects deleted - would need to make a type)?
export async function deletePost(id: string) : Promise<void> {
  await PostModel.deleteOne({ id });
} 

export async function findPostById(id: string) : Promise<BulletinPostSchema | null> {
  const response: BulletinPostSchema | null = await PostModel.findOne({ id });
  return response;
} 

export async function findAllPosts() : Promise<BulletinPostSchema[]> {
  const response: BulletinPostSchema[] = await PostModel.find();
  return response;
} 

export async function findAllPostsInTown(townID: string) : Promise<BulletinPostSchema[]> {
  const response: BulletinPostSchema[] = await PostModel.find({ coveyTownID: townID });
  return response;
} 