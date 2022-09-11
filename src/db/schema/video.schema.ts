import { IVideo } from 'interfaces/video';
import mongoose, { model, Schema, Types } from 'mongoose';
const FileSchema = new Schema({
   itag: {
      type: String,
   },
   file: {
      type: String,
   },
});
const VideoSchema = new Schema(
   {
      title: {
         type: String,
      },
      description: {
         type: String,
      },
      image: {
         type: String,
      },
      videoId: {
         type: String,
      },
      videoLength: {
         type: String,
      },
      profile: {
         type: String,
      },
      category: {
         type: String,
      },
      publishDate: {
         type: String,
      },
      viewCount: {
         type: String,
      },
      formats: {
         type: [mongoose.SchemaTypes.Mixed],
      },
      videoUrl: {
         type: String,
      },
      url: {
         type: String,
      },
      files: {
         type: [FileSchema],
      },
   },
   {
      timestamps: true,
   }
);
export default model<IVideo>('Video', VideoSchema);
