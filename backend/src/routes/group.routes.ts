import express from 'express';
import { insertGroupHandler } from 'handlers/group/command/InsertGroupCommand';
import { getGroupsHandler } from 'handlers/group/query/GetGroupsQuery';
import { getGroupsVideosHandler } from 'handlers/group/query/GetGroupsVideosQuery';

let router = express.Router();

/**
 * @GET
 * @req:{
 *      pageId, eachPerPage
 * }
 *
 * res:{
 *     pageId,
 *     eachPerPage,
 *     total,
 *     groups:Array<IGroup>,
 * }
 */
router.get('/groups', getGroupsHandler);

/**
 * @GET
 * @req:{
 *      pageId, eachPerPage
 * }
 *
 * res:{
 *     Array<IGroup>
 * }
 */
router.post('/insert/group', insertGroupHandler);

/**
 * @GET
 * @req:{
 *      pageId, eachPerPage
 * }
 *
 * res:{
 *     pageId,
       eachPerPage,
       videos: Array<IVideo>,
 * }
 */
router.get('/groups/videos', getGroupsVideosHandler);

export default router;
