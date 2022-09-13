import { NextFunction, Request, Response } from 'express';
import { IMiddlewareModel } from 'interfaces';
import { middleware } from './wrpper';

export const headersMiddleware = middleware(
   ({ res, req, next }: IMiddlewareModel) => {
      {
         // Website you wish to allow to connect
         res.setHeader('Access-Control-Allow-Origin', '*');

         // Request methods you wish to allow
         res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE'
         );

         // Request headers you wish to allow
         res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With,content-type'
         );

         // Set to true if you need the website to include cookies in the requests sent
         // to the API (e.g. in case you use sessions)
         res.setHeader('Access-Control-Allow-Credentials', '');

         // Pass to next layer of middleware
         next();
      }
   }
);
