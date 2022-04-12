import {
  PostCreateRequest,
  PostCreateResponse,
  ResponseEnvelope,
} from '../client/TownsServiceClient';
import CoveyTownsStore from '../lib/CoveyTownsStore';

export default function postCreateHandler(
  requestData: PostCreateRequest,
): ResponseEnvelope<PostCreateResponse> {
  const townsStore = CoveyTownsStore.getInstance();
  const coveyTownController = townsStore.getControllerForTown(requestData.coveyTownID);
  if (!coveyTownController) {
    return {
      isOK: false,
      message: 'Error: No such town',
    };
  }

  const newPost = coveyTownController.addBulletinPost(requestData);
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
