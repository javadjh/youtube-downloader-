import download from 'image-downloader';
import { getDist } from './storage';
interface IFilterQuery {
   pageId: number;
   eachPerPage: number;
   searchValue: string;
   regex: any;
   skipQuery: number;
}

export const filterQuery = (req): IFilterQuery => {
   let { pageId = '1', eachPerPage = '12', searchValue = '' } = req.query;

   let page = parseInt(pageId ? pageId.toString() : '1');
   let each = parseInt(eachPerPage ? eachPerPage.toString() : '12');

   return {
      pageId: page,
      eachPerPage: each,
      searchValue,
      regex: { $regex: searchValue, $options: 'i' },
      skipQuery: (pageId - 1) * eachPerPage,
   };
};
export async function downloadImage(url: string) {
   let isQueryLink = url.lastIndexOf('?');
   let ex: string;
   if (isQueryLink > 0) {
      ex = url.substring(url.lastIndexOf('.'), url.indexOf('?') - 1);
   } else {
      ex = url.substring(url.lastIndexOf('.'), url.length);
   }

   console.log('ddddddddddddddddddddddddddddddfffffffffffffffffffffff');
   console.log(ex);

   console.log(getDist() + `/${Date.now()}${ex}`);
   console.log(ex);

   let filename = await download.image({
      url,
      dest: getDist() + `/${Date.now()}${ex}`,
   });
   console.log(
      'filenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilenamefilename'
   );
   console.log(filename);

   return filename.filename;
}
