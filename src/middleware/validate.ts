import {
   INVALID_TOKEN_ERROR_MESSAGE,
   VALIDATION_ERROR_MESSAGE,
} from 'constants/messages';
import { IMiddlewareModel } from 'interfaces';
import Joi from 'joi';
import { middleware } from './wrpper';
import { HandledError } from '../config/error';
import jwt from 'jsonwebtoken';
import { routeDictionary } from '../config/globalUtility';
import SessionLogSchema from '../db/schema/sessionLog.schema';

export const validate = (schema: Joi.Schema, target = 'body') => {
   return middleware(async (props: IMiddlewareModel) => {
      const { res, req, next } = props;
      try {
         target === 'body'
            ? req.body
            : target === 'query'
            ? req.query
            : ({} = await schema.validateAsync(req.body, {
                 abortEarly: false,
                 allowUnknown: true,
                 stripUnknown: true,
              }));

         return next();
      } catch (err: any) {
         return res.status(400).json({
            state: false,
            message: VALIDATION_ERROR_MESSAGE,
         });
      }
   });
};

export const checkToken = middleware(
   async ({ res, req, next }: IMiddlewareModel) => {
      const token = req?.headers?.token;
      if (!token) throw new HandledError(INVALID_TOKEN_ERROR_MESSAGE);

      const tokenDecode = await jwt.verify(
         token.toString(),
         'sdcsdcs65d4c1s6325dc1s32dc'
      );

      if (tokenDecode) {
         req.token = tokenDecode;
         next();
      } else throw new HandledError(INVALID_TOKEN_ERROR_MESSAGE);
   }
);

export const addAction = middleware(
   async ({ res, req, next }: IMiddlewareModel) => {
      const header = req?.headers;
      const token = req?.headers?.token;
      let data = {
         method: req.method,
         path: req.path,
         ip: req.ip,
         os: header.os,
         browser: header?.browser,
         sessionId: header?.sessionid,
         action: routeDictionary(req.path, req.method),
      };
      if (token) {
         const tokenDecode: any = await jwt.verify(
            token.toString(),
            'sdcsdcs65d4c1s6325dc1s32dc'
         );
         data = { ...data, ...{ userId: tokenDecode.userId } };
      }

      console.log('new header request');
      console.log(header);

      await new SessionLogSchema(data).save();
      next();
   }
);

export const checkAdmin = middleware(
   async ({ res, req, next }: IMiddlewareModel) => {
      const token = req?.headers?.token;
      if (!token) throw new HandledError(INVALID_TOKEN_ERROR_MESSAGE);

      const tokenDecode: any = await jwt.verify(
         token.toString(),
         'sdcsdcs65d4c1s6325dc1s32dc'
      );

      if (tokenDecode?.isAdmin) {
         req.token = tokenDecode;
         next();
      } else throw new HandledError(INVALID_TOKEN_ERROR_MESSAGE);
   }
);
