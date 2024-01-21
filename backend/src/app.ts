import 'reflect-metadata';
import 'module-alias/register';
import { io } from 'socket.io-client';

import express, { json, urlencoded } from 'express';
import { routes } from 'routes';
import { docOption, env } from 'config';
import { connect } from 'db';
import swaggerUI from 'swagger-ui-express';
import { getDist, options } from 'config/storage';
import { mergeAll } from 'middleware/wrpper';
import { CorsMiddleware } from 'middleware/cors';
import { headersMiddleware } from 'middleware/header';
import { glob } from 'glob';
import { FTPUploadFile } from './ftp/push-ftp';
import path from 'path';

const videoFolder = path.resolve(__dirname, '../', 'static/');
const videoGlob = `${videoFolder}/*.webm`;
export let socket: any;
console.log(videoGlob);

env();

(async () => {
   const app = express();
   const port = process?.env?.SERVER_PORT || 5500;

   await connect();

   app.use(json());

   socket = io('https://lifelands.ir/youtube');

   setTimeout(() => {
      socket?.on('connect', function () {
         console.log('socket connected');
      });
   }, 5000);

   app.use(urlencoded({ extended: true }));
   app.use(express.static('uploads'));

   app.use('/doc', swaggerUI.serve, swaggerUI.setup(docOption));

   app.use('/api/v1', apiMiddleware);

   app.use('/upload', fileMiddleware);
   app.get('/files', async (req, res) => {
      let files = await glob(videoGlob);
      for (let i = 0; i < files.length; i++) {
         const element = files[i];
         const name = path.basename(element);

         await FTPUploadFile(name, 'video');
      }

      return res.send('done!');
   });
   app.get('/*', (req, res) => {
      res.send(
         '<h1>this is serverside route , please go back to the front</h1>'
      );
   });

   app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
   });
})();

const apiMiddleware = mergeAll([CorsMiddleware, headersMiddleware, routes]);

const fileMiddleware = mergeAll([
   CorsMiddleware,
   headersMiddleware,
   express.static(getDist(), options),
]);
