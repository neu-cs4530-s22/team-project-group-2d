import { Schema } from 'mongoose';
import postModel from './model';
import { BulletinPost } from '../../types/BulletinPost';

export function createPost(post: BulletinPost) {
  return postModel.create(post);
} 

export function deletePost(id: Schema.Types.ObjectId) {
  return postModel.deleteOne({ _id:  id });
} 

export function findPostById(id: Schema.Types.ObjectId) {
  return postModel.findById(id);
} 

export function findAllPosts() {
  return postModel.find();
} 