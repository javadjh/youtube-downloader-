import * as fs from 'fs';
import ftpConnection from './connect-ftp';
import * as path from 'path';

export async function FTPUploadFile(
   fileName: string,
   department?: any
): Promise<string> {
   try {
      const client = await ftpConnection();

      let pathName: string = path.resolve(
         __dirname,
         '../',
         '../',
         'static/' + fileName
      );

      let FTPPathName: string = `${department}/${department}-${fileName}`;

      await client.uploadFrom(pathName, FTPPathName);
      client.close();

      fs.unlinkSync(pathName);

      return FTPPathName;
   } catch (err) {
      console.log(err);
   }
}
