import express from 'express';
import { getFileQueryHandler } from 'handlers/video/query/GetFileQuery';
import { getVideoInformationHandler } from 'handlers/video/query/GetVideoInformationQuery';
import { getVideosHandler } from 'handlers/video/query/GetVideos';

let router = express.Router();

/**
 * @POST
 * @req:{
 *     url
 * }
 * res:{
 *     IVideo
 * }
 */
router.post('/fetch/video/info', getVideoInformationHandler);

/**
 * @POST
 * @req:{
 * params=>{
 *      id,
 *      itag
 * }
 *
 * res:{
 *     ILink
 * }
 */
router.get('/video/link/:id/:itag', getFileQueryHandler);

/**
 * @GET
 * @req:{
 * params=>{
 *      pageId,eachPerPage,searchValue
 * }
 * res:{
 *     pageId,
 *     eachPerPage,
 *     searchValue,
 *     total,
 *     videos,
 * }
 */
router.get('/videos', getVideosHandler);

export default router;
