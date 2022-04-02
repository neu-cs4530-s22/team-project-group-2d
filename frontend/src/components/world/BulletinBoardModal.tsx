import {
Button,
FormControl,
FormLabel,
Input,
Modal,
ModalBody,
ModalCloseButton,
ModalContent,
ModalFooter,
ModalHeader,
ModalOverlay,

useToast
} from '@chakra-ui/react';
import React,{ useCallback,useMemo,useState } from 'react';
import ConversationArea from '../../classes/ConversationArea';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import useMaybeVideo from '../../hooks/useMaybeVideo';
import CreatePostModal from '../BulletinBoard/CreatePost';


type BulletinBoardModalProps = {
    isOpen: boolean;
    closeModal: ()=>void;
}
export default function BulletinBoardModal( {isOpen, closeModal} : BulletinBoardModalProps): JSX.Element {
    const video = useMaybeVideo()
    const [openCreatePost, setOpenCreatePost] = useState(false);
    const createPostModal = useMemo(() => {
      if (openCreatePost) {
        return (
          <CreatePostModal
            isOpen={openCreatePost}
            closeModal={() => {
              setOpenCreatePost(false);
            }}
          />
        );
      }
      return <></>;
    }, [openCreatePost, setOpenCreatePost]);

    return (
      <>
        <Modal isOpen={isOpen} onClose={()=>{closeModal(); video?.unPauseGame()}}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Bulletin Board </ModalHeader>
            <ModalCloseButton />
            <form
              onSubmit={ev => {
                ev.preventDefault();
              }}>
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel htmlFor='topic'>Topic of Conversation</FormLabel>
                  <Input
                    id='topic'
                    placeholder='Share the topic of your conversation'
                    name='topic'
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => {setOpenCreatePost(true);}}>
                  Create
                </Button>
                <Button onClick={closeModal}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        {createPostModal}
      </>
    );
}

