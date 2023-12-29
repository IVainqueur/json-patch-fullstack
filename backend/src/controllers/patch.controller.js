import { Router as ExpressRouter } from 'express';
import { patchService } from '../services/patch.service.js';
import { unknownEndpoint } from '../services/common.service.js';
import { check_jwt } from '../middleware/index.js';

const router = ExpressRouter();

router.patch('/', check_jwt, patchService)
router.patch('*', unknownEndpoint)


export default router