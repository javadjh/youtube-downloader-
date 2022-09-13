import jwt from 'jsonwebtoken';
import { IToken } from '../interfaces/token';
export const generateToken = async (data: IToken) => {
   const token = jwt.sign(data, process?.env?.TOKEN_SECRET || 'none');

   return token;
};
