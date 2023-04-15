import { env } from 'config';
import mongoose from 'mongoose';

env();

export const connect = async () => {
   try {
      const CONNECTION_STRING =
         process?.env?.DB_CONNECTION || 'mongodb://127.0.0.1:27017/youtube';
      await mongoose.connect(CONNECTION_STRING);

      console.log('database connention now is set!');
   } catch (err: any) {
      console.log(
         'the following error occured in database cnnection process: ',
         err
      );
   }
};
