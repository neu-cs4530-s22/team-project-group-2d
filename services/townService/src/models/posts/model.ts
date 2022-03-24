import { Schema, model, Model } from 'mongoose';
import { BulletinPost } from '../../CoveyTypes';

// mongo sets a unique _id for each item in a collection
// TODO: do we want to use mongo's default id or set our own?
const PostSchema = new Schema<BulletinPost>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Number, required: true },
}, { collection: 'users' });

const PostModel: Model<BulletinPost> = model<BulletinPost>('BulletinPost', PostSchema);
export default PostModel;