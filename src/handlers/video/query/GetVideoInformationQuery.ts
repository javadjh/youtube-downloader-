import { IMiddlewareModel } from 'interfaces';
import { middleware } from 'middleware';
import ytdl, { videoInfo } from 'ytdl-core';
import { insertVideo } from '../command/InsertVideoCommand';
import { IVideo } from 'interfaces/video';
import { HandledError } from 'config/error';
import { CANT_DO_ERROR_MESSAGE } from 'constants/messages';
import VideoSchema from 'db/schema/video.schema';
export const getVideoInformation = middleware(
   async ({ res, req }: IMiddlewareModel) => {
      const { url } = req.body;
      if (!url) throw new HandledError(CANT_DO_ERROR_MESSAGE);
      //https://www.youtube.com/watch?v=126qo59GUko =>example
      //https://www.youtube.com/watch?v=bsXaM4G4D_w&list=PLwQLA73lSe1RfjMzbRLoIkcIJBu25FnVJ =>example
      let endIndex = url.indexOf('&');

      const videoId = url.substring(
         url.indexOf('v=') + 2,
         endIndex === -1 ? url.length : url.indexOf('&')
      );

      const video = await VideoSchema.findOne({
         url,
      });
      if (video?._id) {
         return res.send(video);
      }

      let info: any = await ytdl.getBasicInfo(videoId, {});

      if (info.player_response.playabilityStatus.status === 'OK') {
         let { title, videoId, lengthSeconds, shortDescription, viewCount } =
            info.player_response.videoDetails;
         let thumbnails =
            info.player_response.videoDetails?.thumbnail?.thumbnails;

         let videoData: IVideo = {
            url,
            title,
            description: shortDescription,
            image: thumbnails[thumbnails.length - 1].url,
            videoId,
            videoLength: lengthSeconds,
            profile: info.videoDetails.ownerProfileUrl,
            category: info.videoDetails.category,
            publishDate: info.videoDetails.publishDate,
            viewCount,
            formats: info.formats,
         };
         const video = await insertVideo(videoData);
         res.send(video);
      }
   }
);
