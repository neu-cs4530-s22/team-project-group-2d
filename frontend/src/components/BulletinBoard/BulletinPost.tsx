import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

type BulletinPostProps = {
    title: string;
    author: string;
    createdAt: Date;
    text: string;
    mt: number;
}
export default function BulletinPost({title, author, createdAt, text, mt=5} : BulletinPostProps) : JSX.Element {
    return (<Box rounded="20px" overflow="hidden" borderWidth='1px' boxShadow='md' bg='gray.200' p={8} mt={mt} mb={5}>
        <Heading as='h2' size='md' >{title}</Heading>
        <Text as='span' color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='sm'
            textTransform='uppercase'
            isTruncated>{author}</Text>
        <Text as='span' color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='sm'
            textTransform='uppercase'
            style={{float: 'right'}}
            isTruncated>{createdAt.toLocaleString([], {month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'})}</Text>
        <Text fontSize='sm' mt={5}>{text}</Text>
    </Box>)
}