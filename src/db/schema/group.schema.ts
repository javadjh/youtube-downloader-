import { IGroup } from 'interfaces/group';
import { model, Schema, Types } from 'mongoose';

const GroupSchema = new Schema({
   title: {
      type: String,
   },
   videoIds: {
      type: [Types.ObjectId],
      ref: 'Video',
      default: [],
   },
});
export default model<IGroup>('Group', GroupSchema);
