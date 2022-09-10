const moment = require('jalali-moment');

export const convertToJalali = (date: Date) => {
   return moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD (H:mm)');
};

export const itemArrayDateToJalali = (data: Array<any>) => {
   data.map((item) => {
      item.createdAt = convertToJalali(item.createdAt);
      item.updatedAt = convertToJalali(item.updatedAt);
   });
};

export const itemDateToJalali = (item: any) => {
   item.createdAt = convertToJalali(item.createdAt);
   item.updatedAt = convertToJalali(item.updatedAt);
};
