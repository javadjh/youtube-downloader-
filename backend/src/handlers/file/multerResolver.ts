import { getDist } from 'config/storage';
import multer from 'multer';
import { extname } from 'path';

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, getDist());
   },
   filename: (req, file, cb) => {
      cb(
         null,
         `${file?.fieldname}-${Date.now()}${extname(file?.originalname)}`
      );
   },
});

const fileFilter = (
   req: any,
   file: Express.Multer.File,
   cb: (err: Error | null, status?: boolean) => void
) => {
   cb(null, true);
};

/*const limits = {
   fileSize: 1024 * 1024 * 5,
};*/

const upload = multer({ storage, fileFilter });
//,limits
export default upload;
