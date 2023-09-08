import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { buffer } from "micro";
import { loadStripe } from "@stripe/stripe-js";
import Cors from "micro-cors";

const stripe = await loadStripe(process.env.STRIPE_PK);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const cors = Cors({
  allowMethods: ["POST", "HEAD"]
});

const handler = async (req, res) => {
  await mongooseConnect();
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const data = event.data.object;
        const orderId = data.metadata.orderId;
        const paid = data.payment_status === "paid";
        if (orderId && paid) {
          await Order.findByIdAndUpdate(orderId, { paid: true });
        }
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
  res.status(200).send("ok");
};

export const config = {
  api: { bodyParser: false }
};

export default cors(handler);
