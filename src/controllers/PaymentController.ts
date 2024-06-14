import { Request, Response } from 'express';
import { createHmac } from 'crypto';
import axios from 'axios';

const MERCHANT_ID = 'YOUR_MERCHANT_ID'; // Replace with your PayHere Merchant ID
const MERCHANT_SECRET = 'YOUR_MERCHANT_SECRET'; // Replace with your PayHere Merchant Secret
const PAYHERE_BASE_URL = 'https://sandbox.payhere.lk/pay/checkout'; // Sandbox URL, replace with live URL for production

const processPayment = async (req: Request, res: Response) => {
  try {
    const { orderId, amount, currency, email, first_name, last_name, phone, address, city, country } = req.body;

    const hash = generateHash(MERCHANT_ID, orderId, amount, currency);

    const response = await axios.post(PAYHERE_BASE_URL, {
      merchant_id: MERCHANT_ID,
      return_url: `http://localhost:3000/payment/verify/${orderId}`, // Replace with your frontend verify URL
      cancel_url: `http://localhost:3000/payment/cancel/${orderId}`, // Replace with your frontend cancel URL
      notify_url: `http://localhost:4000/api/payment/notify`, // Replace with your backend notify URL
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      country,
      order_id: orderId,
      items: 'Order Payment',
      currency,
      amount,
      hash
    });

    res.status(200).json({ paymentUrl: response.data.data });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Failed to process payment' });
  }
};

const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig } = req.body;

    const localMd5sig = generateMd5sig(merchant_id, order_id, payhere_amount, payhere_currency, status_code);

    if (md5sig !== localMd5sig) {
      return res.status(400).json({ error: 'Checksum verification failed' });
    }

    if (status_code === '2') {
      // Payment successful, update your database or perform other actions
      // Example: Update payment status in your database
      console.log(`Payment for order ${order_id} successful`);
    }

    res.status(200).end();
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
};

function generateHash(merchantId: string, orderId: string, amount: number, currency: string): string {
  const hashedSecret = MERCHANT_SECRET.toUpperCase();
  const formattedAmount = amount.toFixed(2).replace('.', '');
  const hashString = `${merchantId}${orderId}${formattedAmount}${currency}${hashedSecret}`;
  return createHmac('md5', hashedSecret).update(hashString).digest('hex').toUpperCase();
}

function generateMd5sig(merchantId: string, orderId: string, payhereAmount: string, payhereCurrency: string, statusCode: string): string {
  const hashedSecret = MERCHANT_SECRET.toUpperCase();
  const hashString = `${merchantId}${orderId}${payhereAmount}${payhereCurrency}${statusCode}${hashedSecret}`;
  return createHmac('md5', hashedSecret).update(hashString).digest('hex').toUpperCase();
}

export { processPayment, verifyPayment };
