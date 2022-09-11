import 'reflect-metadata';
import 'module-alias/register';
import express, { json, urlencoded } from 'express';
import { routes } from 'routes';
import { docOption, env } from 'config';
import { connect } from 'db';
import swaggerUI from 'swagger-ui-express';
import { getDist, options } from 'config/storage';
import { mergeAll } from 'middleware/wrpper';
import { CorsMiddleware } from 'middleware/cors';
import { headersMiddleware } from 'middleware/header';

import { getVideoInformation } from 'handlers/video/query/GetVideoInformationQuery';
env();

(async () => {
   const app = express();
   const port = process?.env?.SERVER_PORT || 4400;

   await connect();

   app.use(json());

   app.use(urlencoded({ extended: true }));
   app.use(express.static('uploads'));

   app.use('/doc', swaggerUI.serve, swaggerUI.setup(docOption));

   app.use('/api/v1', apiMiddleware);

   app.use('/upload', fileMiddleware);
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
