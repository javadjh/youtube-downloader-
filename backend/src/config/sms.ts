import axios from 'axios';

export const sendSms = async (to: string, text: string) => {
   const userName = process?.env?.SMS_USERNAME;
   const password = process?.env?.SMS_PASSWORD;
   const from = process?.env?.SMS_FROM;
   //?username=${userName}&password=${password}&to=${to}&from=${from}&text=${text}&isflash=true
   const { status } = await axios.get(
      `http://api.payamak-panel.com/post/Send.asmx/SendSimpleSMS`,
      {
         params: {
            username: userName,
            password,
            to,
            from,
            text,
            isflash: 'true',
         },
      }
   );

   return status;
};
