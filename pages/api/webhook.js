import { mongooseConnect } from "@/lib/mongoose";
import { buffer } from "micro";
import { stripe } from "@/lib/stripe";
import { Order } from "@/models/Order";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const webhookHandler = async (req, res) => {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  const permittedEvents = ["checkout.session.completed", "payment_intent.succeeded", "payment_intent.payment_failed"];

  if (permittedEvents.includes(event.type)) {
    let data;
    await mongooseConnect();

    try {
      switch (event.type) {
        case "checkout.session.completed":
          const data = event.data;
          const orderId = data.metadata.orderId;
          const paid = data.payment_status === "paid";
          if (orderId && paid) {
            await Order.findByIdAndUpdate(orderId, { paid: true });
          }
          console.log(`💰 CheckoutSession status: ${data.payment_status}`);
          break;
        case "payment_intent.failed":
          data = event.data.object;
          console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
          break;
        case "payment_intent.succeeded":
          data = event.data.object;
          console.log(`💰 PaymentIntent status: ${data.status}`);
          break;
        default:
          throw new Error(`Unhhandled event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Webhook handler failed" }, { status: 500 });
    }
  }

  // Handle the event

  /*   switch (event.type) {
    case "checkout.session.completed":
      const data = event.data;
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

  res.status(200).send("ok");
}; */
};
export const config = {
  api: { bodyParser: false }
};

export default webhookHandler;
