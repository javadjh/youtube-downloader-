import { IMiddlewareModel } from 'interfaces';
import { middleware } from 'middleware';
import ytdl, { videoInfo } from 'ytdl-core';
import { insertVideo } from '../command/InsertVideoCommand';
import { IVideo } from 'interfaces/video';
import { HandledError } from 'config/error';
import { CANT_DO_ERROR_MESSAGE } from 'constants/messages';
import VideoSchema from 'db/schema/video.schema';
import { byteToSize } from 'config/sizeUtility';
import { videoDataWrapper } from '../share';
import { mergeAll } from 'middleware/wrpper';
import { checkToken } from 'middleware/validate';
import axios from 'axios';
import { downloadImage } from 'config/globalUtility';
import { getDist } from 'config/storage';
const getVideoInformation = middleware(
   async ({ res, req }: IMiddlewareModel) => {
      let isFind = false

      try{
         const { url } = req.body;
         if (!url) throw new HandledError(CANT_DO_ERROR_MESSAGE);
         //https://www.youtube.com/watch?v=126qo59GUko =>example
         //https://www.youtube.com/watch?v=bsXaM4G4D_w&list=PLwQLA73lSe1RfjMzbRLoIkcIJBu25FnVJ =>example
         let endIndex = url.indexOf('&');
   
         const videoId = url.substring(
            url.indexOf('v=') + 2,
            endIndex === -1 ? url.length : url.indexOf('&')
         );
   
         const video: IVideo = await VideoSchema.findOne({
            url,
         }).lean();
         if (video?._id) {
            isFind = true
            video.formats.map((format) => {
               format.contentLength = byteToSize(parseInt(format.contentLength));
            });
            videoDataWrapper(video);
   
            const { data } = await axios.get(
               'http://5.75.132.228:5500/api/v1/video/link/' +
                  video._id +
                  '/' +
                  video.formats[2].itag
            );
            console.log(data);
   
            video.youtubeFileLink = data;
            let dis = await downloadImage(video.image);
            video.image =
               'http://5.75.132.228:5500/upload/' +
               dis.substring(dis.lastIndexOf('/') + 1, dis.length);
            return res.send(video);
         }
         if(!isFind){
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
               videoDataWrapper(video);
               const { data } = await axios.get(
                  'http://5.75.132.228:5500/api/v1/video/link/' +
                     video._id +
                     '/' +
                     video.formats[2].itag,{
                        onUploadProgress: (progressEvent) => {
                           var percentCompleted = Math.round(
                             (progressEvent.loaded * 100) / progressEvent.total
                           );
                           
                           let progress = 0;
                           const file_size = req.headers['content-length'];
   
                           // set event listener
                           req.on('data', (chunk) => {
                              progress += chunk.length;
                              const percentage = (progress / Number(`${file_size}`)) * 100;
                              console.log(percentage);
                              // other code ...
                           });
                         },
                     }
               );
               console.log(data);
               
               video.youtubeFileLink = data;
               let dis = await downloadImage(video.image);
               video.image =
                  'http://5.75.132.228:5500/upload/' +
                  dis.substring(dis.lastIndexOf('/') + 1, dis.length);
               res.send(video);
            }
         }
         
      }catch(err){
         console.log(err);
         
      }
      
   }
);
export const getVideoInformationHandler = mergeAll([
   // checkToken,
   getVideoInformation,
]);
