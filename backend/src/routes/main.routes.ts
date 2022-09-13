import express from 'express';
import video from './video.routes';
import auth from './auth.routes';
import group from './group.routes';

let router = express.Router();

router.use(video);
router.use(auth);
router.use(group);

export default router;
