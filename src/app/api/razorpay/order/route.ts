import Razorpay from 'razorpay';
const instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
import { NextResponse, NextRequest  } from 'next/server';

export async function POST(request: NextRequest) {
  const { amount, currency, receipt, payment_capture } = await request.json();

  try {
    const order = await instance.orders.create({ amount, currency, receipt, payment_capture });
    console.log('Order created:', order);
    return new NextResponse(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
  }
}   