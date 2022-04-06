import { Schema, model, Model } from 'mongoose';
import { BulletinPostSchema } from '../../types/BulletinPost';


const PostSchema = new Schema<BulletinPostSchema>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  coveyTownID: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
}, { collection: 'bulletin_posts' });

const PostModel: Model<BulletinPostSchema> = model<BulletinPostSchema>('BulletinPost', PostSchema);
export default PostModel;