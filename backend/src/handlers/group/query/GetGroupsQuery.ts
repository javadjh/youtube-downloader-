import { itemArrayDateToJalali } from 'config/dateUtility';
import { filterQuery } from 'config/globalUtility';
import GroupSchema from 'db/schema/group.schema';
import { IMiddlewareModel } from 'interfaces';
import { middleware } from 'middleware';
import { checkToken } from 'middleware/validate';
import { mergeAll } from 'middleware/wrpper';

const getGroups = middleware(async ({ res, req }: IMiddlewareModel) => {
   const { pageId, eachPerPage, skipQuery } = filterQuery(req);

   const groups = await GroupSchema.find()
      .sort({ updatedAt: -1 })
      .skip(skipQuery)
      .limit(eachPerPage)
      .lean();

   const total = await GroupSchema.find().count();

   itemArrayDateToJalali(groups);
   groups.map((group) => {
      group.videoCount = group.videoIds.length;
   });

   return res.send({
      pageId,
      eachPerPage,
      total,
      groups,
   });
});
export const getGroupsHandler = mergeAll([checkToken, getGroups]);
