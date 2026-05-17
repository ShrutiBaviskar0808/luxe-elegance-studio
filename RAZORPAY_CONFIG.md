/**
 * RAZORPAY CONFIGURATION & SETUP
 * 
 * Follow these steps to complete your Razorpay integration
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 1: ADD YOUR RAZORPAY API KEY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Location: src/lib/razorpay.ts
// Find line ~127 and update:

// BEFORE:
const key = "rzp_live_YOUR_KEY_ID";

// AFTER (replace with your actual key):
const key = "rzp_live_abc123def456ghi789"; // Get from Razorpay Dashboard

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 2: BACKEND API INTEGRATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * CREATE ORDER ENDPOINT
 * 
 * This endpoint creates a Razorpay order.
 * Implement on your backend.
 */

// Example: Node.js + Express + Razorpay SDK
// npm install razorpay

/*
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/api/orders', async (req, res) => {
  try {
    const { amount, receipt, customer_email, customer_phone } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: receipt,
      customer_notify: 1,
      notes: {
        email: customer_email,
        phone: customer_phone,
      },
    });

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * VERIFY PAYMENT ENDPOINT
 * 
 * This endpoint verifies the payment signature.
 * Implement on your backend.
 */

// Example: Node.js + Express

/*
const crypto = require('crypto');

app.post('/api/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const verified = expectedSignature === razorpay_signature;

    if (verified) {
      // Save order to database
      // Send confirmation email
      res.json({ verified: true });
    } else {
      res.status(400).json({ verified: false, error: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 3: UPDATE FRONTEND API CALLS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Location: src/lib/razorpay.ts

// BEFORE (Mock implementation):
// export const createRazorpayOrder = async (amount, receipt) => {
//   return { id: `order_${Date.now()}`, ... };
// };

// AFTER (Real backend call):
// export const createRazorpayOrder = async (amount, receipt) => {
//   const response = await fetch('/api/orders', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ amount, receipt }),
//   });
//   if (!response.ok) throw new Error('Failed to create order');
//   return response.json();
// };

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 4: ENVIRONMENT VARIABLES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Create .env.local file in your project root:

/*
VITE_RAZORPAY_KEY=rzp_live_your_key_here
VITE_API_URL=https://yourdomain.com/api
*/

// Then use in code:
// const apiUrl = import.meta.env.VITE_API_URL;
// const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 5: TEST YOUR INTEGRATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Testing Checklist:
 * 
 * ✓ Add test key to src/lib/razorpay.ts
 * ✓ Fill out checkout form
 * ✓ Click "Complete Purchase"
 * ✓ Razorpay modal should open
 * ✓ Use test card: 4111 1111 1111 1111
 * ✓ Payment should complete
 * ✓ Success message should show
 * ✓ Check Razorpay dashboard for transaction
 * ✓ Test on mobile device
 * ✓ Test all payment methods
 * ✓ Test form validation
 * ✓ Test error handling
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 6: SECURITY BEST PRACTICES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Frontend Security:
 * ✓ Use HTTPS only
 * ✓ Keep API key public (client key only)
 * ✓ Validate form inputs
 * ✓ Never store sensitive data in localStorage
 * ✓ Don't expose secret key in frontend code
 * 
 * Backend Security:
 * ✓ Verify payment signature server-side
 * ✓ Use secret key only on backend
 * ✓ Validate amount matches order
 * ✓ Check customer email/phone
 * ✓ Log all transactions
 * ✓ Set CORS correctly
 * ✓ Rate limit API endpoints
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 7: WEBHOOK SETUP (OPTIONAL BUT RECOMMENDED)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Razorpay webhooks notify your backend of payment events.
 * This ensures orders are tracked even if user closes browser.
 * 
 * 1. Go to Razorpay Dashboard > Settings > Webhooks
 * 2. Add endpoint: https://yourdomain.com/api/webhook/razorpay
 * 3. Select events: payment.authorized, payment.failed
 * 4. Add secret key to environment variables
 * 
 * Example webhook handler:
 */

/*
app.post('/api/webhook/razorpay', (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const body = req.rawBody; // Raw body required for verification
  
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  if (signature === expectedSignature) {
    const event = req.body;
    
    if (event.event === 'payment.authorized') {
      const payment = event.payload.payment.entity;
      // Update order status
      // Send confirmation email
      res.json({ status: 'ok' });
    }
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
});
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP 8: USEFUL RESOURCES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Documentation:
 * - Razorpay Docs: https://razorpay.com/docs/
 * - API Reference: https://razorpay.com/docs/api/
 * - Checkout Guide: https://razorpay.com/docs/payments/
 * - Test Credentials: https://razorpay.com/docs/payments/test-cards/
 * 
 * Dashboard:
 * - Razorpay Dashboard: https://dashboard.razorpay.com/
 * - View Transactions: Dashboard > Payments
 * - API Keys: Settings > API Keys
 * - Webhooks: Settings > Webhooks
 * 
 * Support:
 * - Email: support@razorpay.com
 * - Phone: +91-8595-355-355
 * - Twitter: @razorpayinc
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// QUICK REFERENCE: PAYMENT FLOW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * User Flow:
 * 
 * 1. User adds items to cart
 * 2. Clicks "Secure Checkout"
 * 3. Fills delivery details
 * 4. Clicks "Complete Purchase"
 * 5. Frontend calls /api/orders
 * 6. Backend returns order ID
 * 7. Razorpay modal opens
 * 8. User selects payment method & pays
 * 9. Frontend gets response
 * 10. Frontend calls /api/verify-payment
 * 11. Backend verifies signature
 * 12. Order is confirmed
 * 13. Success message shown
 * 14. Email confirmation sent
 * 
 * Error Cases:
 * - Payment cancelled → Show error message
 * - Network error → Show retry option
 * - Verification failed → Log & investigate
 * - Invalid form → Show validation errors
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NEED HELP?
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Common Issues & Solutions:
 * 
 * "Script not loading"
 * → Check internet connection
 * → Check Razorpay CDN is accessible
 * → Check browser console for errors
 * 
 * "Modal not opening"
 * → Verify API key is correct
 * → Check form validation passes
 * → Check browser console for errors
 * 
 * "Payment failing"
 * → Use test credentials
 * → Check your backend API endpoints
 * → Verify signature verification
 * → Check Razorpay dashboard logs
 * 
 * "Form validation issues"
 * → Name can't be empty
 * → Email must be valid
 * → Phone must be 10+ digits
 * → Pincode must be 6+ digits
 * 
 * Still stuck?
 * → Check RAZORPAY_SETUP.md
 * → Check PAYMENT_INTEGRATION_GUIDE.md
 * → Read Razorpay docs
 * → Contact Razorpay support
 */
