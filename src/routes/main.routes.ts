import express from 'express';
import video from './video.routes';

let router = express.Router();

router.use(video);

export default router;
