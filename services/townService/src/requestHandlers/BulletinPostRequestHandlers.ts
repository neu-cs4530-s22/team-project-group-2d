import {
  PostCreateRequest,
  PostCreateResponse,
  PostListResponse,
  ResponseEnvelope,
} from '../client/TownsServiceClient';
import CoveyTownsStore from '../lib/CoveyTownsStore';
import { findAllPosts, findAllPostsInTown } from '../models/posts/dao';

export async function postCreateHandler(
  requestData: PostCreateRequest,
): Promise<ResponseEnvelope<PostCreateResponse>> {
  const townsStore = CoveyTownsStore.getInstance();
  const coveyTownController = townsStore.getControllerForTown(requestData.coveyTownID);
  if (!coveyTownController) {
    return {
      isOK: false,
      message: 'Error: No such town',
    };
  }

  const newPost = await coveyTownController.addBulletinPost(requestData);
  if (!newPost) {
    return {
      isOK: false,
      message: 'Error: Failed to create post',
    };
  }

  return {
    isOK: true,
    response: {
      post: newPost,
    },
  };
}

export function postListHandler(): ResponseEnvelope<PostListResponse> {
  findAllPosts();
  return {
    isOK: true,
    response: {
      posts: [],
    },
  };
}

export function postListByTownHandler(townID: string): ResponseEnvelope<PostListResponse> {
  findAllPostsInTown(townID);
  return {
    isOK: true,
    response: {
      posts: [],
    },
  };
}
