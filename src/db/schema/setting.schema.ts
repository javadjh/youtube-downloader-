import { model, Schema } from 'mongoose';


const SettingSchema = new Schema({
   logo: {
      type: String,
   },
   sliders: {
      type: [String],
   },
   phoneNumber: {
      type: String,
   },
   email: {
      type: String,
   },
});
// export default model<ISetting>('Setting', SettingSchema);
