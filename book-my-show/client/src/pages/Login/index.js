import React from "react";
import { Button, Input, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/book-my-show-logo.svg";
import { LoginUser } from "../../api/users";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response?.success) {
        message.success(response.message);
        localStorage.setItem("auth_token", JSON.stringify(response.token));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <main className="App-header">
        <h1 style={{ display: "flex", gap: "10px", height: "30px" }}>
          Login to{" "}
          <span>
            <img src={Logo} alt="BookMyShow Logo" />
          </span>
        </h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                prefix={<UserOutlined />}
                autoComplete="email"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                autoComplete="off"
              ></Input.Password>
            </Form.Item>
            <Form.Item className="d-block">
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  backgroundColor: "rgb(24, 144, 255)",
                }}
                block
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <Form.Item>
            <span style={{ fontSize: "16px" }}>Or</span>
          </Form.Item>
          <Form.Item>
            <Link to="/register">
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  backgroundColor: "green",
                }}
              >
                Create new account
              </Button>
            </Link>
          </Form.Item>
          <Form.Item>
            <span>Forgot Password ?</span>
            <Link to="/forgot-password"> Click here</Link>
          </Form.Item>
        </section>
      </main>
    </>
  );
};

export default Login;
