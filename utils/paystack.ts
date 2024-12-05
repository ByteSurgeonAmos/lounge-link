import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function verifyPaystackTransaction(reference: string) {
  const url = `https://api.paystack.co/transaction/verify/${reference}`;
  const headers = {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(url, { headers });
    // Include subscription data in the response
    return response.data;
  } catch (error) {
    console.error("Error verifying Paystack transaction:", error);
    throw new Error("Could not verify transaction");
  }
}
