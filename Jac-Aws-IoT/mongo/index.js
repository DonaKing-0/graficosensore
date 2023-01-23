import { Router } from 'express';

import msg from './msg/msgindex.js'
import alarm from './alarm/alarmindex.js'

const router = new Router();

router.use('/msg', msg);
router.use('/alarm', alarm);

export default router;