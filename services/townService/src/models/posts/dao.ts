import { Schema } from 'mongoose';
import PostModel from './model';
import ServerBulletinPost from '../../types/BulletinPost';
import { PostCreateRequest } from '../../CoveyTypes';

export async function createPost(post: PostCreateRequest) : Promise<ServerBulletinPost> {
  const response: ServerBulletinPost = await PostModel.create(post);
  return response;
} 

// TODO change return type (mongo returns a boolean and number of objects deleted - would need to make a type)?
export async function deletePost(id: Schema.Types.ObjectId) : Promise<void> {
  await PostModel.deleteOne({ _id:  id });
} 

export async function findPostById(id: Schema.Types.ObjectId) : Promise<ServerBulletinPost | null> {
  const response: ServerBulletinPost | null = await PostModel.findById(id);
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