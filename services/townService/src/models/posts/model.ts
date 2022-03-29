import { Schema, model, Model } from 'mongoose';
import ServerBulletinPost from '../../types/BulletinPost';

const PostSchema = new Schema<ServerBulletinPost>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  coveyTownID: { type: String, required: true },
}, { collection: 'bulletin_posts' });

const PostModel: Model<ServerBulletinPost> = model<ServerBulletinPost>('BulletinPost', PostSchema);
export default PostModel;