import fs from 'fs';
import { IMiddlewareModel } from 'interfaces';
import { middleware } from 'middleware';
import ytdl from 'ytdl-core';
import { isValidObjectId } from 'mongoose';
import { videoFormat } from 'ytdl-core';
import { HandledError } from 'config/error';
import { OBJECT_ID_ERROR_MESSAGE } from 'constants/messages';
import VideoSchema from 'db/schema/video.schema';
import { IVideo } from 'interfaces/video';
import readline from 'readline';
import { getDist } from 'config/storage';
import { mergeAll } from 'middleware/wrpper';
import { checkToken } from 'middleware/validate';
export const getFileQuery = middleware(
   async ({ res, req }: IMiddlewareModel) => {
      const { id, itag } = req.params;

      if (!isValidObjectId(id)) throw new HandledError(OBJECT_ID_ERROR_MESSAGE);
      const video: IVideo = await VideoSchema.findById(id);

      try {
         video.files.map((file) => {
            if (itag.toString() === file.itag) {
               return res.status(200).send(file.file).end();
            }
         });

         let formatObject: videoFormat;
         video.formats.map((format) => {
            if (format.itag.toString() === itag) {
               formatObject = format;
            }
         });
         await getFile(formatObject, video, res, req);
      } catch (error) {
         console.log(error);
      }
   }
);

const getFile = async (format: videoFormat, videoData: any, res, req: any) => {
   let { fileName, urlFileName } = getFileName(format);

   const video = ytdl(videoData.url, {
      filter: (format) => format.container === 'mp4',
      quality: 'highest',
   });
   let starttime;
   video.pipe(fs.createWriteStream(fileName));
   video.once('response', () => {
      starttime = Date.now();
   });
   video.on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
      const estimatedDownloadTime =
         downloadedMinutes / percent - downloadedMinutes;
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
      process.stdout.write(
         `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
            total /
            1024 /
            1024
         ).toFixed(2)}MB)\n`
      );
      process.stdout.write(
         `running for: ${downloadedMinutes.toFixed(2)}minutes`
      );
      process.stdout.write(
         `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
      );

      //write in res download prossess
      let progress = 0;
      const file_size = req.headers['content-length'];

      // set event listener
      req.on('data', (chunk) => {
         progress += chunk.length;
         const percentage = (progress / file_size) * 100;
         console.log(percentage);
      });

      readline.moveCursor(process.stdout, 0, -1);
   });
   video.on('end', async () => {
      process.stdout.write('\n\n');
      videoData.files.push({
         itag: format.itag,
         file: urlFileName,
      });
      await videoData.save();
      return res.status(200).send(urlFileName).end();
   });
};
const getFileName = (format: videoFormat): any => {
   let mime = format.mimeType;
   let ex = mime.includes('video/mp4;')
      ? 'mp4'
      : mime.includes('video/webm')
      ? 'webm'
      : mime.includes('audio/mp4;')
      ? 'm4a'
      : mime.includes('audio/webm;')
      ? 'webm'
      : 'mp4';

   let name = Date.now() + format.itag + `.${ex}`;
   let fileName = getDist() + '/' + name;
   let urlFileName = `http://5.75.132.228:5500/upload/${name}`;
   return { fileName, urlFileName };
};
export const getFileQueryHandler = mergeAll([
   getFileQuery,
]);
