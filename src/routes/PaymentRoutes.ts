import express, { Request, Response } from 'express';
import crypto from 'crypto-js';

const router = express.Router();

router.get('/getHash', (req: Request, res: Response) => {
  const merchant_id = "1226126";
  const order_id = "ItemNo12345";
  const amount = "1000.00";
  const currency = "LKR";
  const merchant_secret = "MzQxNTg0NDg5Mzk5NzMxOTMxNTE0NDI3NDI0MTIxNTA5ODc0NTM3";

  const hashInput = `${merchant_id}${order_id}${amount}${currency}${merchant_secret}`;
  const hash = crypto.MD5(hashInput).toString().toUpperCase();

  res.json({ hash });
});

export default router;
