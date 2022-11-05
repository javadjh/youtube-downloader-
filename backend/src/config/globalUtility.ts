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
   let filename = await download.image({
      url,
      dest: getDist(),
   });
   return filename.filename;
}
