import { Stripe } from "@stripe/stripe-js";
import { Button, Card, Divider } from "antd";
import { SyntheticEvent } from "react";
import { useAppSelector } from "../redux/store/configureStore";

interface Props {
  stripe: Stripe | null;
  handleSubmit: (event: SyntheticEvent) => Promise<void>;
}

const CheckoutSummary = ({ stripe, handleSubmit }: Props) => {
  const { basket } = useAppSelector((state) => state.basket);
  const total = basket?.items.reduce((sum, item) => sum + item.price, 0);
  return (
    <>
      <Card>
        <h2>Summary</h2>
        <Divider type="horizontal" />
        <div className="checkout__summary__total">
          <span>Total:</span>
          <span>$ {total}</span>
        </div>
        <Divider type="horizontal" />
        <Button
          type="primary"
          className="checkout__summary__button"
          size="large"
          onClick={handleSubmit}
          disabled={!stripe}
        >
          Make payment
        </Button>
      </Card>
    </>
  );
};

export default CheckoutSummary;
