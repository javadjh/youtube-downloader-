import express from 'express';
import { getFileQuery } from 'handlers/video/query/GetFileQuery';
import { getVideoInformation } from 'handlers/video/query/GetVideoInformationQuery';

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
router.post('/fetch/video/info', getVideoInformation);

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
router.get('/video/link/:id/:itag', getFileQuery);

export default router;
