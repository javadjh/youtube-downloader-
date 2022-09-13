import 'reflect-metadata';
import 'module-alias/register';
import { connect } from '../db';
import UserSchema from 'db/schema/user.schema';
import { passwordBcrypt } from './password';

const seed = async () => {
   const password = await passwordBcrypt('Admin5151');
   await new UserSchema({
      userName: 'admin',
      password,
   }).save();
};

(async () => {
   try {
      await connect();
      await seed();
      console.log('great, seeding done successfully!');
   } catch (err: any) {
      console.log('following error occured seeding proccess', err);
   }
})();
