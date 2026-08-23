# Security Policy

## Secrets

Never commit:

* Gemini API Key
* Razorpay Secret
* Render Tokens
* Vercel Tokens

All secrets are stored in deployment environment variables.

## Payment Verification

Payment signatures are verified only on the backend using Razorpay secret keys.
