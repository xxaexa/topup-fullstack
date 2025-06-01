import express from 'express';
import { midtransCallback } from '../controllers/midtransControllers';

const router = express.Router();

router.post('/midtrans/callback', midtransCallback);

export default router;