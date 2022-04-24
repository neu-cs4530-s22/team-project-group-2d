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
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import useCoveyAppState from '../../hooks/useCoveyAppState';

type CreatePostModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

/**
 * React component which is a modal presented to the user as a way to create posts for the bulletin board
 * @param param0 props for closing and opening the current post modal
 * @returns
 */
export default function CreatePostModal({ isOpen, closeModal }: CreatePostModalProps): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const { apiClient, userName, currentTownID } = useCoveyAppState();
  const toast = useToast();
  const createPost = useCallback(async () => {
    if (title !== '' && text !== '') {
      try {
        await apiClient.createBulletinPost({
          title,
          author: userName,
          text,
          coveyTownID: currentTownID,
        });
        toast({
          title: 'Post Created!',
          status: 'success',
        });
        closeModal();
      } catch (err) {
        toast({
          title: 'Unable to create post',
          description: err.toString(),
          status: 'error',
        });
      }
    } else {
      toast({
        title: 'Unable to create post',
        description: 'Invalid title and/or text field',
        status: 'error',
      });
    }
  }, [title, text, apiClient, userName, currentTownID, toast, closeModal]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
      }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new post</ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={ev => {
            ev.preventDefault();
            createPost();
          }}>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor='title'>Title of Post</FormLabel>
              <Input
                id='title'
                placeholder='Pick a title for your new post'
                name='title'
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={50}
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={3} htmlFor='text'>
                Text for Post
              </FormLabel>
              <Textarea
                id='text'
                placeholder='Enter your text here'
                name='text'
                value={text}
                onChange={e => setText(e.target.value)}
                maxLength={300}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={createPost}>
              Create
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
