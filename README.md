# IRONFIT UK — starter storefront

This is a starter project, not a launched/production-ready store. It includes a responsive storefront and a server-side Stripe Checkout session endpoint. Product catalogue entries and prices are placeholders.

## Requirements
- Node.js 18+
- A Stripe account with test mode enabled
- Verified supplier/product information before selling supplements
- A domain and hosting provider for public launch

## Run locally
1. Install Node.js from https://nodejs.org/
2. Unzip this folder and open a terminal in it.
3. Run `npm install`
4. Copy `.env.example` to `.env`
5. In Stripe Dashboard, copy a **test-mode** secret key and put it in `.env` as `STRIPE_SECRET_KEY`. Never put a secret key in browser JavaScript or share it.
6. Run `npm start`
7. Open http://localhost:4242

Stripe Checkout will only work after adding a valid key. Use test mode and test cards first. Do not switch to live payments until the business, products, policies, order handling, security and tax settings are ready.

## Before public launch
- Replace every sample product, price and emoji with real approved products, accurate images, full ingredients, allergens, net quantity, usage directions, warnings and supplier details.
- Validate food supplement compliance and claims for Great Britain; register as a Food Business Operator with the local authority where required.
- Add business name, address, contact details, shipping/returns policy, privacy policy, terms, cookie handling as applicable, and customer service workflow.
- Configure delivery, stock, refunds, order confirmation emails, monitoring, backups, domain and HTTPS.
- Add Stripe webhooks and a reliable order database before taking live orders. This starter only redirects to Stripe Checkout; it does not persist orders or verify fulfilment.
- Add server-side product/price management, rate limiting, validation and production deployment settings.
- Check current UK consumer, food, privacy, VAT and advertising requirements with qualified advisers as appropriate.

## Architecture
- `public/index.html`: storefront UI, search and demo basket.
- `server.js`: Express server and server-side Stripe Checkout session creation.
- `.env.example`: environment variable template.
- `package.json`: dependencies and start script.

## Important
The example catalog is hard-coded on the server to prevent customers changing checkout prices from the browser, but it is not connected to inventory. This is a technical starter for development and must be reviewed and completed before production use.
