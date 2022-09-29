import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import agent from "../actions/agent";
import Checkout from "../components/Checkout";
import { setBasket } from "../redux/slice/basketSlice";
import { useAppDispatch } from "../redux/store/configureStore";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51LmZbSIqUF54L8xKqOERTQ9aAikzA4DJhidS02QZSvd70L3nyGWAl9Qyj8ZoKfEBNY5xKPg7mUZnsB5ibfBcQLdW00AFGOohlg"
);

export default function CheckoutPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    agent.Payments.paymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}
