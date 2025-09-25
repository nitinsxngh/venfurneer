import Razorpay from 'razorpay';

// Razorpay configuration
export const razorpayConfig = {
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_RLQCo5zT8hGnCO',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '23GmisLB0JeeIAO3pP4T25El',
};

// Initialize Razorpay instance
export const razorpay = new Razorpay({
    key_id: razorpayConfig.key_id,
    key_secret: razorpayConfig.key_secret,
});

// Razorpay options interface
export interface RazorpayOptions {
    amount: number;
    currency: string;
    receipt: string;
    notes?: {
        [key: string]: string;
    };
}

// Create Razorpay order
export const createRazorpayOrder = async (options: RazorpayOptions) => {
    try {
        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        console.error('Razorpay order creation error:', error);
        throw error;
    }
};

// Verify Razorpay payment
export const verifyRazorpayPayment = async (orderId: string, paymentId: string, signature: string) => {
    try {
        const crypto = require('crypto');
        const expectedSignature = crypto
            .createHmac('sha256', razorpayConfig.key_secret)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        return expectedSignature === signature;
    } catch (error) {
        console.error('Razorpay payment verification error:', error);
        return false;
    }
};
