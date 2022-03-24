import { Schema } from 'mongoose';
import BulletinPost from '../types/BulletinPost';
import { createPost, deletePost, findAllPosts } from '../models/posts/dao';
import { ResponseEnvelope } from './CoveyTownRequestHandlers';

/**
 * Response from the server for a BulletinPost create request
 */
export interface PostCreateResponse {
  postID: Schema.Types.ObjectId | undefined; // TODO shouldn't undefined - doing for stubs
}

/**
 * Response from the server for a BulletinPost list request
 */
export interface PostListResponse {
  towns: BulletinPost[];
}

/**
 * Payload sent by the client to delete a BulletinPost
 */
export interface PostDeleteRequest {
  postID: Schema.Types.ObjectId;
  coveyTownPassword: string;
}

export function postCreateHandler(requestData: BulletinPost): ResponseEnvelope<PostCreateResponse> {
  createPost(requestData);
  return {
    isOK: true,
    response: {
      postID: undefined,
    },
  };
}

export function postDeleteHandler(requestData: PostDeleteRequest): ResponseEnvelope<Record<string, null>> {
  deletePost(requestData.postID);
  return {
    isOK: true,
    response: {},
  };
}

export function postListHandler(): ResponseEnvelope<PostListResponse> {
  findAllPosts();
  return {
    isOK: true,
    response: {
      towns: [],
    },
  };
}
