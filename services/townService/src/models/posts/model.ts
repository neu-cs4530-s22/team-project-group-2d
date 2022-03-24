import { model } from 'mongoose';
import postSchema from './schema';
import { BulletinPost } from '../../types/BulletinPost';

export default model<BulletinPost>('BulletinPost', postSchema);