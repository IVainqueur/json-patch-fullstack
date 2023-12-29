import {Router as ExpressRouter} from 'express';
import { login } from '../services/auth.service.js';
import { unknownEndpoint } from '../services/common.service.js';

const router = ExpressRouter();

router.post('/login', login)
router.use('*', unknownEndpoint)

export default router