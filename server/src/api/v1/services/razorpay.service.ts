import Razorpay from "razorpay";
import crypto from "crypto";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// ----------------------
// Create order on Razorpay
// ----------------------
export const createRazorpayOrder = async (amount: number) => {
  const options = {
    amount: amount * 100, // Amount in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  return await razorpay.orders.create(options);
};

// ----------------------
// Verify payment signature
// ----------------------
export const verifySignature = (
  orderId: string,
  paymentId: string,
  signature: string
) => {
  const body = orderId + "|" + paymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
};
