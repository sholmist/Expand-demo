import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { Card, Form } from "antd";
import { ChangeEvent, useState } from "react";
import CheckoutSummary from "./CheckoutSummary";

const Checkout = () => {
  const [cardName, setCardName] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
  };

  const [form] = Form.useForm();

  return (
    <div className="checkout">
      <div className="checkout__form">
        <h1>Checkout Page</h1>
        <Card title="Fill your card details here">
          <Form form={form} layout="vertical">
            <Form.Item
              name={"cardName"}
              rules={[
                {
                  required: true,
                  message: "Card Name is required",
                  min: 5,
                },
              ]}
              label="Name on card"
            >
              <input
                name="cardName"
                placeholder="Mention the name on your card"
                value={cardName}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Card number">
              <div className="stripe-input">
                <CardNumberElement />
              </div>
            </Form.Item>
            <div className="inline">
              <Form.Item label="Expiry Date">
                <div className="stripe-input">
                  <CardExpiryElement />
                </div>
              </Form.Item>
              <Form.Item label="CVV">
                <div className="stripe-input">
                  <CardCvcElement />
                </div>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </div>
      <div className="checkout__summary">
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default Checkout;
