import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { BulletinPostSchema } from '../../classes/BulletinPost';

type BulletinPostProps = {
    post: BulletinPostSchema;
}
export default function BulletinPost({post} : BulletinPostProps) : JSX.Element {
    const date = new Date(post.createdAt);
    return (<Box rounded="20px" overflow="hidden" borderWidth='1px' boxShadow='md' bg='gray.200' p={8} mt={5} mb={5}>
        <Heading as='h2' size='md' >{post.title}</Heading>
        <Text as='span' color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='sm'
            textTransform='uppercase'
            isTruncated>{post.author}</Text>
        <Text as='span' color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='sm'
            textTransform='uppercase'
            style={{float: 'right'}}
            isTruncated>{date.toLocaleString([], {month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'})}</Text>
        <Text fontSize='sm' mt={5}>{post.text}</Text>
    </Box>)
}