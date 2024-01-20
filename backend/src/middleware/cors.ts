import { IMiddlewareModel } from 'interfaces';
import { middleware } from './wrpper';
import cors from 'cors';
import { Request } from 'express';

// export const CorsMiddleware = middleware((props: IMiddlewareModel) => {
//    const { res, req, next } = props;
//    const whitelist = [
//       '5.75.132.228:3000',
//       '5.75.132.228:3100',
//       '5.75.132.228:3300',
//       '116.202.210.69:3100',
//       '116.202.210.69:3300',
//    ];

//    const origin = req?.get('host');
//    console.log(origin, whitelist.indexOf(origin));

//    if (whitelist.indexOf(origin) !== -1) {
//    }
// });
const whitelist = ['lifelands.ir', '37.32.14.122', '37.32.14.122:80', 'https://lifelands.ir'];
export const CorsMiddleware = cors((req: Request, handler) => {
   let options;

   console.log(req?.get('host'));
   console.log(req?.get('Origin'));
   if (whitelist.indexOf(req?.get('host')) !== -1 || whitelist.indexOf(req?.get('Origin')) !== -1) {
      options = { origin: true };
   } else {
      options = { origin: false };
   }
   handler(null, options);
});
