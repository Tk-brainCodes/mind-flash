import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const formatAmountForStripe = (amount: number) => {
  return Math.round(amount * 100);
};

const CURRENCY = "usd";

export async function POST(req: Request, res: NextResponse) {
  const { amount } = await req.json();

  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "donate",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: "Pro Subscription",
            },
            unit_amount: formatAmountForStripe(amount),
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers}/result?session_id={CHECKOUT_SESSION_ID}`,
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, { status: 2000 });
  } catch (err: any) {
    return NextResponse.json(`Something went wrong: ${err.message}`, {
      status: 500,
    });
  }
}
