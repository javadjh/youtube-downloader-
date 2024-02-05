import VideoSchema from 'db/schema/video.schema';
import { IVideo } from 'interfaces/video';

export const insertVideo = async (data: IVideo): Promise<IVideo> => {
   const video: IVideo = await new VideoSchema(data).save();
   let findVideo = await VideoSchema.findById(video._id).lean();
   return findVideo;
};
