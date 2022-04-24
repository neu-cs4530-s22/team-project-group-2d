import {
  PostCreateRequest,
  PostCreateResponse,
  ResponseEnvelope,
} from '../client/TownsServiceClient';
import CoveyTownsStore from '../lib/CoveyTownsStore';

/**
 * A handler to process a new bulletin post for a town's bulletin board
 * Client makes a PostCreateRequest, this handler is executed
 *
 * @param requestData an object representing the post request
 */
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
