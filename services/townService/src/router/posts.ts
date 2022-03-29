import express, { Express } from 'express';
import io from 'socket.io';
import { Server } from 'http';

export default function addPostRoutes(http: Server, app: Express): io.Server {
  /*
   * Create a new post
   */
  app.post('/post', express.json(), async () => {
    
  });

  /**
   * Delete a post
   */
  app.delete('/posts/:postID', express.json(), async () => {
    
  });

  /**
   * List all posts
   */
  app.get('/posts', express.json(), async () => {
    
  });

  /**
   * List all posts for a town
   */
  app.get('/posts/:townID', express.json(), async () => {
    
  });
  
  const socketServer = new io.Server(http, { cors: { origin: '*' } });
  return socketServer;
}
