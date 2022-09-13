import {
   INVALID_TOKEN_ERROR_MESSAGE,
   VALIDATION_ERROR_MESSAGE,
} from 'constants/messages';
import { IMiddlewareModel } from 'interfaces';
import Joi from 'joi';
import { middleware } from './wrpper';
import { HandledError } from '../config/error';
import jwt from 'jsonwebtoken';

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
         process?.env?.TOKEN_SECRET || 'none'
      );

      if (tokenDecode) {
         req.token = tokenDecode;
         next();
      } else throw new HandledError(INVALID_TOKEN_ERROR_MESSAGE);
   }
);
