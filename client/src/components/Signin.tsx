import { Button, Card, Form, Input, notification, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Login } from "../models/user";
import { signInUser } from "../redux/slice/userSlice";
import { useAppDispatch } from "../redux/store/configureStore";

interface Props {
  toggleRegister: () => void;
}

const Signin = ({ toggleRegister }: Props) => {
  const [values, setValues] = useState<Login>({
    email: "",
    password: "",
  });

  const { Title, Text } = Typography;

  const { email, password } = values;

  // HELP: Why wont useDispath work here?
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = () => {
    setValues({ ...values, email: "", password: "" });
    form.resetFields();
  };

  const history = useHistory();

  const submitUser = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      //Generated pattern  /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
      if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && password.length >= 6) {
        await dispatch(signInUser(values));
        history.push("/profile");
      }
      resetForm();
    } catch (error: any) {
      notification.error({
        message: "Please check your email or password",
      });
      resetForm();
    }
  };

  return (
    <Card className="log-in-card">
      <div className="log-in-card__info">
        <Typography>
          <Title level={2} className="log-in-card__intro-title">
            Log In
          </Title>
          <Text className="log-in-card__intro-text">
            Use your email and password to Login!
          </Text>
        </Typography>
      </div>
      <Content className="log-in__form">
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          onSubmitCapture={submitUser}
          form={form}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter a valid email!",
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              },
            ]}
          >
            <Input value={email} name="email" onChange={handleChange}></Input>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a valid password!",
                min: 6,
              },
            ]}
          >
            <Input.Password
              value={password}
              name="password"
              onChange={handleChange}
            ></Input.Password>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button onClick={submitUser} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <div onClick={toggleRegister} className="log-in-card__toggle">
        Not a user yet? Register here!
      </div>
    </Card>
  );
};

export default Signin;
