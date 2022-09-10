import { join, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const getDist = () => {
   const DEST = `../../static`;
   const destPath = join(__dirname, DEST);
   if (!existsSync(destPath)) {
      mkdirSync(destPath);
   }
   return destPath;
};

export const options = {
   dotfiles: 'ignore',
   etag: true,
   extensions: ['htm', 'html'],
   //   index: false,
   redirect: false,
   setHeaders: (res: any, path: any, state: any) => {
      res?.set('x-timestamp', Date.now());
   },
};
