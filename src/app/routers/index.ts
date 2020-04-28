import { router as userRouter } from './user';
import { router as groupRouter } from './group';
import { router as groupUserRouter } from './groupUser';
import { Router } from 'express';

export const router: Router = Router({mergeParams: true});
router.use('/user', userRouter);
router.use('/group', groupRouter);
router.use('/group/:groupId/user', groupUserRouter);
