import { NextFunction, Request, Response } from 'express';
import { IToken } from './token';

export interface TokenizedRequset extends Request {
   token?: any;
}
export interface IMiddlewareModel {
   req: TokenizedRequset;
   res: Response;
   next: NextFunction;
}
