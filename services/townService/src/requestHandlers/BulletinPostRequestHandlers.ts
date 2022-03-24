import { Schema } from 'mongoose';
import { createPost, deletePost, findAllPosts } from '../models/posts/dao';
import { ResponseEnvelope } from './CoveyTownRequestHandlers';
import { PostCreateRequest } from '../CoveyTypes';
import ServerBulletinPost from '../types/BulletinPost';


/**
 * Response from the server for a BulletinPost create request
 */
export interface PostCreateResponse {
  post: ServerBulletinPost | undefined; // TODO remove undefined - using for stubs
}

/**
 * Response from the server for a BulletinPost list request
 */
export interface PostListResponse {
  towns: ServerBulletinPost[];
}

/**
 * Payload sent by the client to delete a BulletinPost
 */
export interface PostDeleteRequest {
  postID: Schema.Types.ObjectId;
  coveyTownPassword: string;
}

export function postCreateHandler(requestData: PostCreateRequest): ResponseEnvelope<PostCreateResponse> {
  createPost(requestData);
  return {
    isOK: true,
    response: {
      post: undefined,
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
