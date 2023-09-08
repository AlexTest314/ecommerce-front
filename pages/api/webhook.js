import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { buffer } from "micro";
import Cors from "micro-cors";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const cors = Cors({
  allowMethods: ["POST", "HEAD"]
});

const webhookHandler = async (req, res) => {
  await mongooseConnect();
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log("✅ Success:", event.id);

    // Handle the event
    try {
      switch (event.type) {
        case "checkout.session.completed":
          const data = event.data;
          const orderId = data.metadata.orderId;
          const paid = data.payment_status === "paid";
          if (orderId && paid) {
            await Order.findByIdAndUpdate(orderId, { paid: true });
            await Order.findByIdAndRemove("64fb6bb2a0c09d0a3350f812");
          }
          // Then define and call a function to handle the event payment_intent.succeeded
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  res.status(200).send("ok");
};

export const config = {
  api: { bodyParser: false }
};

export default cors(webhookHandler);
