import { IUser } from 'interfaces/user';
import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
   userName: {
      type: String,
   },
   password: {
      type: String,
   },
});
export default model<IUser>('User', UserSchema);
