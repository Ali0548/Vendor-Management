import { Router } from 'express';
import { AsyncWrapper } from '@/utils';
import {uploadAndConvertFile} from '../controllers/convertedfile/convertFile';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });
router.post('/uploadAndConvertFile', upload.single('file'),AsyncWrapper(uploadAndConvertFile))

export default router