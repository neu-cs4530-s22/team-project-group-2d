import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import useMaybeVideo from '../../hooks/useMaybeVideo';
import BulletinPost from '../BulletinBoard/BulletinPost';
import CreatePostModal from '../BulletinBoard/CreatePostModal';

type BulletinBoardModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};


export default function BulletinBoardModal({
  isOpen,
  closeModal,
}: BulletinBoardModalProps): JSX.Element {
  const video = useMaybeVideo();
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

  const {bulletinPosts} = useCoveyAppState();

  return (
    <>
      <Modal
        isOpen={isOpen}
        size='xl'
        scrollBehavior='inside'
        onClose={() => {
          closeModal();
          video?.unPauseGame();
        }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as='h2' size='lg'>
              Bulletin Board
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {bulletinPosts.map(post => <BulletinPost key={post.id} post={post} />)}
            {bulletinPosts.length === 0 && <Text>It seems like there aren&apos;t any post on the Bulletin Board yet. Add your own by clicking the Write a Post button. </Text>}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() => {
                setOpenCreatePost(true);
              }}>
              Write a Post
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {createPostModal}
    </>
  );
}
