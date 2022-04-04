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
    Textarea,} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
// import useCoveyAppState from '../../hooks/useCoveyAppState';

type CreatePostModalProps = {
  isOpen: boolean;
  closeModal: ()=>void;
}

export default function CreatePostModal({isOpen, closeModal} : CreatePostModalProps): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  // const {apiClient, sessionToken, currentTownID} = useCoveyAppState();
  const createPost = useCallback(async () => {
      // will implement later; most likely api call/api route call
  // }, [topic, apiClient, newConversation, closeModal, currentTownID, sessionToken, toast, video]);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={()=>{closeModal()}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new post</ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={ev => {
            ev.preventDefault();
            createPost(); }}>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor='title'>Title of Post</FormLabel>
              <Input
                id='title'
                placeholder='Pick a title for your new post'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={6} htmlFor='text'>Text for Post</FormLabel>
              <Textarea
                id='text'
                placeholder='Enter your text here'
                name='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
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