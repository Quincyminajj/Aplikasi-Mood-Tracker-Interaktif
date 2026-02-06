import express from 'express';
import { saveMood, getMoodByDate, getCalendarMoods } from '/controllers/moodController.js';

const router = express.Router();

router.post('/save', saveMood);
router.get('/:userId/:date', getMoodByDate);
router.get('/calendar/:userId', getCalendarMoods);

export default router;
