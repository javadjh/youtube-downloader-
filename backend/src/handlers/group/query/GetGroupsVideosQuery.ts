import { filterQuery } from 'config/globalUtility';
import GroupSchema from 'db/schema/group.schema';
import { IMiddlewareModel } from 'interfaces';
import { IGroup } from 'interfaces/group';
import { middleware } from 'middleware';
import { checkToken } from 'middleware/validate';
import { mergeAll } from 'middleware/wrpper';

const getGroupsVideos = middleware(async ({ res, req }: IMiddlewareModel) => {
   const { pageId, eachPerPage, skipQuery } = filterQuery(req);
   const { groupId } = req.query;

   console.log(skipQuery);
   console.log(skipQuery + eachPerPage);

   const group: IGroup = await GroupSchema.findById(groupId, {
      videoIds: { $slice: [skipQuery, skipQuery + eachPerPage] },
   }).populate('videoIds');

   let groupInstance = await GroupSchema.findById(groupId);
   const total: number = groupInstance.videoIds.length;

   return res.send({
      pageId,
      eachPerPage,
      total,
      groupId,
      videos: group.videoIds,
   });
});
export const getGroupsVideosHandler = mergeAll([checkToken, getGroupsVideos]);
