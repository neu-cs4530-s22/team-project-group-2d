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
import useMaybeVideo from '../../hooks/useMaybeVideo';
import BulletinPost from '../BulletinBoard/BulletinPost';
import CreatePostModal from '../BulletinBoard/CreatePostModal';

type BulletinBoardModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

type BulletinPostObject = {
  id: string;
  title: string;
  author: string;
  text: string;
  mt?: number;
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

  const [bulletinPosts, setBulletinPosts] = useState<BulletinPostObject[]>([
    {
      id: '1',
      title: 'Example Post',
      author: 'Example Author',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.',
      mt: 0,
    },
    {
      id: '2',
      title: 'Example Post',
      author: 'Example Author',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
    {
      id: '3',
      title: 'Example Post',
      author: 'Example Author',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
    {
      id: '4',
      title: 'Example Post',
      author: 'Example Author',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
    {
      id: '5',
      title: 'Example Post',
      author: 'Example Author',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
    {
      id: '6',
      title: 'Example Post',
      author: 'Example Author',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
    {
      id: '7',
      title: 'Example Post',
      author: 'Example Author',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
  ]);

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
            {bulletinPosts.map(post => {
              const { id, title, author, text, mt = 5 } = post;
              return <BulletinPost key={id} title={title} author={author} text={text} mt={mt} />;
            })}
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
