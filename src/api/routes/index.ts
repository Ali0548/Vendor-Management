import { Router } from "express";
const router = Router();

import auth from './auth';
import user from './user';
import task from './task';
import ftp from './ftp';
import vendor from './vendor';

import { Authentication, Authorization } from "@/middlewares";
import { UserRoles } from "../models/user/enum";

router.use('/auth', auth);
router.use('/user', Authentication, Authorization([UserRoles.ADMIN]),  user);
router.use('/task', Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]),  task);
router.use('/ftp',
    //  Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]),
  ftp);
router.use('/vendor', Authentication, Authorization([UserRoles.ADMIN, UserRoles.USER]), vendor);



export default router;