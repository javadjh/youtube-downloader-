import { socket } from '../../../app';
import * as fs from 'fs';
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
      let isFind = false;

      try {
         const { url } = req.body;

         if (!url) throw new HandledError(CANT_DO_ERROR_MESSAGE);
         //https://www.youtube.com/watch?v=126qo59GUko =>example
         //https://www.youtube.com/watch?v=bsXaM4G4D_w&list=PLwQLA73lSe1RfjMzbRLoIkcIJBu25FnVJ =>example
         let endIndex = url.indexOf('&');

         let videoId = url.substring(
            url.indexOf('v=') + 2,
            endIndex === -1 ? url.length : url.indexOf('&')
         );

         if (videoId?.includes('youtu.be')) {
            videoId = url.substring(url.lastIndexOf('/') + 1, url?.length);
         }

         if (!videoId) {
            videoId = getParameterByName('v', url);
         }

         console.log('ddddddddddddddddddfffffffffffffff3333333333333');
         console.log(videoId);

         const video: IVideo = await VideoSchema.findOne({
            url,
         }).lean();
         if (video?._id) {
            isFind = true;
            video.formats.map((format) => {
               format.contentLength = byteToSize(
                  parseInt(format.contentLength)
               );
            });
            videoDataWrapper(video);

            const { data } = await axios.get(
               'http://5.75.132.228:5500/api/v1/video/link/' +
                  video._id +
                  '/' +
                  video.formats[2].itag,
               { params: { userId: `${req?.body?.userId}`, link: url } }
            );
            console.log(data);

            video.youtubeFileLink = data;

            socket?.emit('linkStep', {
               userId: req?.query?.userId || 'test',
               link: req.query?.link,
               step: 'در حال دریافت تصویر ویدیو',
            });

            let dis = await downloadImage(video.image);

            video.image =
               'https://lifelands.ir/youtube/upload/' +
               dis.substring(dis.lastIndexOf('/') + 1, dis.length);
            return res.send(video);
         }
         if (!isFind) {
            let info: any;

            try {
               info = await ytdl.getBasicInfo(videoId, {});
               console.log('ddddddddddddddddddddddddddddddddd');
            } catch (error) {
               console.log('edrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
               console.log(error);
            }

            // console.log(info);
            console.log(
               'info.player_response.videoDetailsinfo.player_response.videoDetails'
            );
            console.log(info.player_response.videoDetails);
            console.log(
               info.player_response.videoDetails?.thumbnail?.thumbnails
            );

            if (info.player_response.playabilityStatus.status === 'OK') {
               let {
                  title,
                  videoId,
                  lengthSeconds,
                  shortDescription,
                  viewCount,
               } = info.player_response.videoDetails;
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
                     video.formats[2].itag,
                  { params: { userId: `${req?.body?.userId}`, link: url } }
               );
               console.log(data);

               video.youtubeFileLink = data;

               socket?.emit('linkStep', {
                  userId: req?.query?.userId || 'test',
                  link: req.query?.link,
                  step: 'در حال دریافت تصویر ویدیو',
               });

               let dis = await downloadImage(video.image);
               video.image =
                  'https://lifelands.ir/youtube/upload/' +
                  dis.substring(dis.lastIndexOf('/') + 1, dis.length);

               if (video.image.includes('?')) {
                  fs.renameSync(
                     `${getDist()}/${dis.substring(
                        dis.lastIndexOf('/') + 1,
                        dis.length
                     )}`,
                     dis.substring(dis.lastIndexOf('/') + 1, dis.indexOf('?'))
                  );
                  video.image =
                     'https://lifelands.ir/youtube/upload/' +
                     dis.substring(dis.lastIndexOf('/') + 1, dis.indexOf('?'));
               }
               console.log(video.image);

               res.send(video);
            }
         }
      } catch (err) {
         socket?.emit('downloadYoutubeProgress', {
            userId: req?.query?.userId || 'test',
            link: req.query?.link,
            progress: 'لینک مشکل دارد',
         });

         console.log('errerrerrerrerrerrerrerr');
         console.log(err);
         socket?.emit('linkStep', {
            userId: req?.query?.userId || 'test',
            link: req.query?.link,
            step: 'لینک مشکل دارد',
         });

         return res.status(400).send({ state: false }).end();
      }
   }
);
export const getVideoInformationHandler = mergeAll([
   // checkToken,
   getVideoInformation,
]);
function getParameterByName(name, url = window.location.href) {
   name = name.replace(/[\[\]]/g, '\\$&');
   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
