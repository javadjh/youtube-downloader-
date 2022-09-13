import express from 'express';
import { loginHandler } from 'handlers/auth/Login';

let router = express.Router();

/**
 * @POST
 * @req:{
 *      userName:string;
 *      password:string;
 * }
 *
 * res:{
 *     token
 * }
 */
router.post('/login', loginHandler);

export default router;
