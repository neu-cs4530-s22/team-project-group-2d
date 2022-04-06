import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

type BulletinPostProps = {
    title: string;
    author: string;
    text: string;
}
export default function BulletinPost({title, author, text} : BulletinPostProps) : JSX.Element {
    return (<Box rounded="20px" overflow="hidden" borderWidth='1px' boxShadow='md' bg='gray.200' p={8} mt={5} mb={5}>
        <Heading as='h2' size='md' >{title}</Heading>
        <Text color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='sm'
            textTransform='uppercase'
            mt={1}
            isTruncated>{author}</Text>
        <Text fontSize='sm' mt={5}>{text}</Text>
    </Box>)
}