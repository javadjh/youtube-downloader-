import express from 'express';
import video from './video.routes';
import auth from './auth.routes';

let router = express.Router();

router.use(video);
router.use(auth);

export default router;
