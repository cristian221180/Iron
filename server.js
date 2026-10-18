require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 4242;

const catalogue = {
  whey: { name: "Whey Protein — Sample", amount: 2499 },
  creatine: { name: "Creatine Monohydrate — Sample", amount: 1799 },
  electrolytes: { name: "Electrolyte Mix — Sample", amount: 1299 },
  shaker: { name: "IRONFIT Shaker — Sample", amount: 899 }
};

app.post("/create-checkout-session", async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(503).json({ error: "Missing STRIPE_SECRET_KEY. Add your Stripe test key to .env." });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const ids = req.body && req.body.items;
  if (!Array.isArray(ids) || ids.length < 1 || ids.length > 50 || ids.some(id => !catalogue[id])) {
    return res.status(400).json({ error: "Invalid basket." });
  }
  try {
    const counts = ids.reduce((acc, id) => { acc[id] = (acc[id] || 0) + 1; return acc; }, {});
    const line_items = Object.entries(counts).map(([id, quantity]) => ({
      quantity,
      price_data: {
        currency: "gbp",
        unit_amount: catalogue[id].amount,
        product_data: { name: catalogue[id].name }
      }
    }));
    const origin = process.env.STORE_URL || `http://localhost:${PORT}`;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/?checkout=cancelled`
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error.message);
    res.status(500).json({ error: "Could not create checkout session." });
  }
});
app.listen(PORT, () => console.log(`IRONFIT demo running at http://localhost:${PORT}`));
