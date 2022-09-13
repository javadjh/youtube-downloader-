import { HandledError } from 'config/error';
import { generateToken } from 'config/jwt';
import { comparePassword } from 'config/password';
import { RECORDE_DOES_NOT_EXIST } from 'constants/messages';
import UserSchema from 'db/schema/user.schema';
import { IMiddlewareModel } from 'interfaces';
import { IUser } from 'interfaces/user';
import Joi from 'joi';
import { middleware } from 'middleware';
import { validate } from 'middleware/validate';
import { mergeAll } from 'middleware/wrpper';

const login = middleware(async ({ res, req }: IMiddlewareModel) => {
   const { userName, password } = req.body;
   const user: IUser = await UserSchema.findOne({
      userName,
   });
   if (!user?._id || !(await comparePassword(password, user.password)))
      throw new HandledError(RECORDE_DOES_NOT_EXIST);

   const token = await generateToken({
      userId: user._id,
   });

   return res.send(token);
});
const loginValidator = validate(
   Joi.object({
      userName: Joi.string().required(),
      password: Joi.string().required(),
   })
);
export const loginHandler = mergeAll([loginValidator, login]);
