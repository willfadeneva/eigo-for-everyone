import Razorpay from "razorpay";
import crypto from "crypto";

// ─── Client (server-side only) ────────────────────────────────────────────────

export const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const PLATFORM_FEE_PCT = 0.18; // 18% commission

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CreateOrderParams {
  amountInPaise: number;   // Razorpay works in smallest unit (paise for INR)
  currency?: string;
  bookingId: string;
  tutorName: string;
  studentEmail: string;
  studentName: string;
}

export interface RouteTransferParams {
  razorpayPaymentId: string;
  tutorRazorpayAccountId: string;
  amountInPaise: number;   // 82% of total
  currency?: string;
  bookingId: string;
}

// ─── Order Creation ───────────────────────────────────────────────────────────

/**
 * Create a Razorpay order before showing the checkout modal.
 * Amount must be in paise (₹1 = 100 paise).
 */
export async function createOrder(params: CreateOrderParams) {
  const order = await razorpay.orders.create({
    amount:   params.amountInPaise,
    currency: params.currency ?? "INR",
    receipt:  `booking_${params.bookingId}`,
    notes: {
      booking_id:    params.bookingId,
      tutor_name:    params.tutorName,
      student_email: params.studentEmail,
      student_name:  params.studentName,
    },
  });
  return order;
}

// ─── Payment Verification ─────────────────────────────────────────────────────

/**
 * Verify Razorpay webhook / checkout signature.
 * Call this server-side after student completes payment.
 */
export function verifyPaymentSignature(params: {
  orderId:   string;
  paymentId: string;
  signature: string;
}): boolean {
  const body    = `${params.orderId}|${params.paymentId}`;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");
  return expected === params.signature;
}

/**
 * Verify Razorpay webhook event signature.
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret   = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  return expected === signature;
}

// ─── Route Transfer (Tutor Payout) ────────────────────────────────────────────

/**
 * After a successful payment, split via Razorpay Route:
 * - Platform keeps 18%
 * - Transfer 82% to tutor's linked Razorpay account
 */
export async function transferToTutor(params: RouteTransferParams) {
  const transfer = await (razorpay.transfers as any).create({
    account:  params.tutorRazorpayAccountId,
    amount:   params.amountInPaise,
    currency: params.currency ?? "INR",
    source:   "payment",
    source_id: params.razorpayPaymentId,
    notes: { booking_id: params.bookingId },
  });
  return transfer;
}

// ─── Helper: INR amount ───────────────────────────────────────────────────────

/** Convert ₹ decimal to paise integer */
export const toPaise = (rupees: number): number => Math.round(rupees * 100);

/** Convert paise to ₹ decimal */
export const toRupees = (paise: number): number => paise / 100;

/** Format ₹ for display */
export const formatINR = (rupees: number): string =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(rupees);

// ─── Fee Calculator ───────────────────────────────────────────────────────────

export function calculateSplit(totalRupees: number) {
  const platformFee = +(totalRupees * PLATFORM_FEE_PCT).toFixed(2);
  const tutorPayout = +(totalRupees - platformFee).toFixed(2);
  return { totalRupees, platformFee, tutorPayout };
}
