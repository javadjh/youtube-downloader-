import { UNKNOWN_ERROR } from 'constants/messages';
import { NextFunction, Response } from 'express';
import { compose } from 'compose-middleware';
import { IMiddlewareModel, TokenizedRequset } from '../interfaces';

export const middleware = (fn: (props: IMiddlewareModel) => any) => {
   return async (req: TokenizedRequset, res: Response, next: NextFunction) => {
      try {
         return await fn({ req, res, next });
      } catch (err: any) {
         console.log(err);

         return res?.status(400).json({
            state: false,
            message: err.handled ? err?.message : UNKNOWN_ERROR,
         });
      }
   };
};

export const mergeAll = (list: Array<any>) => {
   return compose([...list]);
};
