import { IMiddlewareModel } from 'interfaces';
import { middleware } from './wrpper';
import cors from 'cors';
import { Request } from 'express';

// export const CorsMiddleware = middleware((props: IMiddlewareModel) => {
//    const { res, req, next } = props;
//    const whitelist = [
//       'localhost:3000',
//       'localhost:3100',
//       'localhost:3300',
//       '116.202.210.69:3100',
//       '116.202.210.69:3300',
//    ];

//    const origin = req?.get('host');
//    console.log(origin, whitelist.indexOf(origin));

//    if (whitelist.indexOf(origin) !== -1) {
//    }
// });
const whitelist = [
   '192.168.1.34:3000',
   '192.168.1.34:3100',
   '192.168.1.34:5500',
];
export const CorsMiddleware = cors((req: Request, handler) => {
   let options;

   console.log(req?.get('host'));
   console.log(req?.get('Origin'));
   if (whitelist.indexOf(req?.get('host')) !== -1) {
      options = { origin: true };
   } else {
      options = { origin: false };
   }
   handler(null, options);
});
