import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "../components/Checkout";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51LmZbSIqUF54L8xKqOERTQ9aAikzA4DJhidS02QZSvd70L3nyGWAl9Qyj8ZoKfEBNY5xKPg7mUZnsB5ibfBcQLdW00AFGOohlg"
);

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}
