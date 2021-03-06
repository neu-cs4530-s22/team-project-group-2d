import express, { Express } from 'express';
import { StatusCodes } from 'http-status-codes';
import postCreateHandler from '../requestHandlers/BulletinPostRequestHandlers';
import { logError } from '../Utils';

export default function addPostRoutes(app: Express): void {
  /*
   * Create a new post
   */
  app.post('/posts', express.json(), async (req, res) => {
    try {
      const result = postCreateHandler(req.body);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error, please see log in server for more details',
      });
    }
  });
}
