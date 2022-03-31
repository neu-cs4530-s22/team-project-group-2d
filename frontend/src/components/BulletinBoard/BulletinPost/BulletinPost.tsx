import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

type BulletinPostProps = {
    title: string;
    author: string;
    text: string;
}
export default function BulletinPost({title, author, text} : BulletinPostProps) : JSX.Element {
    return (<Box>
        <Heading as='h2' size='xl'>{title}</Heading>
        <Heading as='h3' size='l' isTruncated>{author}</Heading>
        <Text fontSize='sm'>{text}</Text>
    </Box>)
}