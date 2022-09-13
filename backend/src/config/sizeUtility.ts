export const byteToSize = (bytes: number) => {
   let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
   return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};
