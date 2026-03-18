"use client";

import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  async function displayRazorpay() {
    if (!isLoaded) {
      alert("Razorpay failed to load!");
      return;
    }

    const res = await fetch("/api/razorpay/order", { method: "POST" ,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1",
        payment_capture: "1",
      }),
    });
    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      handler: function (response: Record<string, unknown>) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      },
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id,
      prefill: {
        name: "Honey Singh",
        email: "HelloHoney@gmail.com",
        "contact": "+919876543210"
      
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setIsLoaded(true)}
      />
      <h1 className="text-4xl font-bold mb-8">Razorpay Payment</h1>
      <button
        onClick={displayRazorpay}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
      >
        Pay Now
      </button>
    </main>
  );
}