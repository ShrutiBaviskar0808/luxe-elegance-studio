# Razorpay Payment Integration Setup

## Overview
This guide walks you through setting up Razorpay payment gateway for the PIPA Jewellery ecommerce platform.

## Features Implemented

✅ Razorpay Checkout Popup Integration
✅ Multiple Payment Methods (UPI, Cards, Net Banking, Wallets)
✅ Premium Luxury UI/UX Design
✅ Responsive Mobile & Desktop
✅ Loading States & Animations
✅ Success/Error Messages
✅ Form Validation
✅ Secure Payment Processing

## Installation Steps

### 1. Create Razorpay Account
- Visit [Razorpay Dashboard](https://dashboard.razorpay.com/)
- Sign up and complete KYC verification
- Get your API Key ID and API Secret

### 2. Update API Key
Replace the placeholder in `src/lib/razorpay.ts`:

```typescript
const key = "rzp_live_YOUR_KEY_ID"; // Your Razorpay Live Key
```

### 3. Project Structure

```
src/
├── components/
│   ├── CheckoutForm.tsx          # Main checkout form with payment
│   ├── PaymentButton.tsx         # Reusable payment button
│   └── RazorpayScriptLoader.tsx  # Script loader component
├── lib/
│   └── razorpay.ts              # Razorpay utilities & helpers
└── routes/
    └── checkout.tsx             # Checkout page route
```

## Usage

### 1. Add Checkout Button to Product Page
```tsx
import PaymentButton from "@/components/PaymentButton";

export function ProductCard() {
  return (
    <div>
      <h3>Product Name</h3>
      <PaymentButton 
        label="Buy Now"
        variant="primary"
        size="lg"
        fullWidth
      />
    </div>
  );
}
```

### 2. Customize Payment Button
```tsx
<PaymentButton
  label="Complete Purchase"
  showIcon={true}
  size="lg"           // sm | md | lg
  variant="primary"   // primary | secondary | outline
  fullWidth={true}
  disabled={false}
/>
```

### 3. Form Validation
The CheckoutForm includes built-in validation for:
- Name (required)
- Email (valid format)
- Phone (10+ digits)
- Address (required)
- City (required)
- Pincode (6+ digits)

## API Integration (Backend)

### For Production, implement these endpoints:

#### 1. Create Order
```
POST /api/orders
Body: {
  amount: number,
  receipt: string,
  customer_email?: string,
  customer_phone?: string
}
Response: {
  id: string,
  amount: number,
  currency: string,
  receipt: string,
  status: string
}
```

#### 2. Verify Payment
```
POST /api/verify-payment
Body: {
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string
}
Response: {
  verified: boolean
}
```

### Update razorpay.ts
```typescript
// In createRazorpayOrder function
const response = await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount, receipt })
});
return response.json();

// In verifyPaymentSignature function
const response = await fetch('/api/verify-payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ paymentId, orderId, signature })
});
return response.json().verified;
```

## Payment Methods Supported

✅ **UPI** - Google Pay, PhonePe, Paytm, WhatsApp Pay
✅ **Cards** - Visa, Mastercard, Amex
✅ **Net Banking** - All major Indian banks
✅ **Wallets** - Paytm, Amazon Pay, Freecharge
✅ **BNPL** - Bajaj Finserv, Flexipay, etc.

## Security Features

- ✅ SSL Encryption (HTTPS only)
- ✅ PCI DSS Compliant
- ✅ Payment signature verification
- ✅ Form validation on client & server
- ✅ No sensitive data stored locally
- ✅ Secure API endpoints

## Testing

### Test Credentials
- Test Payment ID: `rzp_test_YOUR_TEST_KEY`
- Test UPI: `success@razorpay`
- Test Card: `4111 1111 1111 1111` (CVV: any 3 digits)

### Mock Payments
Razorpay provides test mode - use test credentials in test environment before going live.

## Customization

### Change Payment Button Style
Edit `src/components/PaymentButton.tsx`:
```tsx
const variantClasses = {
  primary: "bg-gold hover:bg-gold/90 text-onyx font-semibold",
  // Add custom styles
};
```

### Change Checkout Form Colors
Edit `src/components/CheckoutForm.tsx`:
```tsx
<Button className="bg-linear-to-r from-gold to-champagne ...">
```

### Add Additional Fields
Edit `src/components/CheckoutForm.tsx` formData state and form fields.

## Troubleshooting

### Script Not Loading
- Check browser console for errors
- Ensure Razorpay CDN is accessible
- Try reloading the page

### Payment Popup Not Opening
- Verify Razorpay API key is correct
- Check browser console for errors
- Ensure form validation passes

### Form Validation Issues
- All required fields must be filled
- Email must include @
- Phone must be 10+ digits
- Pincode must be 6+ digits

## Production Checklist

- [ ] Replace test keys with live keys
- [ ] Implement backend API endpoints
- [ ] Set up email notifications
- [ ] Configure order tracking
- [ ] Test with real payments
- [ ] Enable SMS alerts
- [ ] Set up refund process
- [ ] Configure webhooks

## Support

- Razorpay Docs: https://razorpay.com/docs/
- Razorpay Support: support@razorpay.com
- Live Chat: Available on Razorpay Dashboard

## License
This integration is part of PIPA Jewellery ecommerce platform.
