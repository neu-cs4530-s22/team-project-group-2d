import { Schema } from 'mongoose';
import PostModel from './model';
import BulletinPost from '../../types/BulletinPost';

export async function createPost(post: BulletinPost) : Promise<BulletinPost> {
  const response: BulletinPost = await PostModel.create(post);
  return response;
} 

// TODO change return type?
export async function deletePost(id: Schema.Types.ObjectId) : Promise<void> {
  await PostModel.deleteOne({ _id:  id });
} 

export async function findPostById(id: Schema.Types.ObjectId) : Promise<BulletinPost | null> {
  const response: BulletinPost | null = await PostModel.findById(id);
  return response;
} 

export async function findAllPosts() : Promise<BulletinPost[]> {
  const response: BulletinPost[] = await PostModel.find();
  return response;
} 