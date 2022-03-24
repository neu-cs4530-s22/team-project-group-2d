import { Schema } from 'mongoose';
import { BulletinPost } from '../../types/BulletinPost';

// mongo sets a unique _id for each item in a collection
// TODO: do we want to use mongo's default id or set our own?
const postSchema = new Schema<BulletinPost>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Number, required: true },
}, { collection: 'users' });

export default postSchema;