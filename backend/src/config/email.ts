import { emailTheme } from './emailTheme';

const nodemailer = require('nodemailer');
export const sendEmail = async (email, subject, link, fullName) => {
   const appSetting = {
      mailHost: 'mail.nahalara.co',
      mailPort: 465,
      mailUser: 'info@nahalara.co',
      mailPassword: 'info147852369',
      mail: 'info@nahalara.co',
   };

   try {
      const transporter = nodemailer.createTransport({
         host: appSetting.mailHost,
         port: appSetting.mailPort,
         secure: true,
         auth: {
            user: appSetting.mailUser,
            pass: appSetting.mailPassword,
         },
      });
      const mailOpts = {
         from: appSetting.mail,
         to: email,
         subject: subject,
         html: emailTheme(fullName, link),
      };
      await transporter.sendMail(mailOpts, (error) => {
         if (error) {
         } else {
         }
      });
   } catch (error) {}
};
