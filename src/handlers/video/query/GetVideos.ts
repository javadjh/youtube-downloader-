import { filterQuery } from 'config/globalUtility';
import VideoSchema from 'db/schema/video.schema';
import { IMiddlewareModel } from 'interfaces';
import { middleware } from 'middleware';
import { checkToken } from 'middleware/validate';
import { mergeAll } from 'middleware/wrpper';
import { videosDataWrapper } from '../share';

const getVideos = middleware(async ({ res, req }: IMiddlewareModel) => {
   const { pageId, eachPerPage, skipQuery, regex, searchValue } =
      filterQuery(req);

   let filter = {
      $or: [
         { title: regex },
         { description: regex },
         { videoId: regex },
         { category: regex },
         { publishDate: regex },
         { viewCount: regex },
         { videoUrl: regex },
         { url: regex },
      ],
   };

   const videos = await VideoSchema.find(filter)
      .sort({ createdAt: -1 })
      .skip(skipQuery)
      .limit(eachPerPage)
      .lean();
   const total = await VideoSchema.find(filter).count();

   videosDataWrapper(videos);

   return res.send({
      pageId,
      eachPerPage,
      searchValue,
      total,
      videos,
   });
});
export const getVideosHandler = mergeAll([checkToken, getVideos]);
