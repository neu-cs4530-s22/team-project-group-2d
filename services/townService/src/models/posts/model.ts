import { Schema, model, Model } from 'mongoose';
import ServerBulletinPost from '../../types/BulletinPost';

const PostSchema = new Schema<ServerBulletinPost>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  coveyTownID: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
}, { collection: 'bulletin_posts' });

const PostModel: Model<ServerBulletinPost> = model<ServerBulletinPost>('BulletinPost', PostSchema);
export default PostModel;