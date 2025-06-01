import { Request, Response } from 'express';

export const midtransCallback = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    console.log('Callback Midtrans diterima:', payload);

    const {
      transaction_status,
      order_id,
      fraud_status,
      payment_type,
    } = payload;
    if (transaction_status === 'settlement') {
      console.log(`Pembayaran sukses untuk order ${order_id}`);
    } else if (transaction_status === 'cancel' || transaction_status === 'expire') {
      console.log(`Pembayaran gagal untuk order ${order_id}`);
    }
    res.status(200).send('OK');
    return
  } catch (error) {
    console.error('Error di callback Midtrans:', error);
    res.status(500).send('Internal Server Error');
    return
  }
};
