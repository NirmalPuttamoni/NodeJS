import { Button, Form, Input, message, Radio } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/book-my-show-logo.svg";
import { RegisterUser } from "../../api/users";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      // console.log("response : ", response);
      if (response?.success) {
        //success
        message.success(response.message);
        form.resetFields();
        navigate("/login");
      } else {
        // error
        message.error(response.message);
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
          Register to{" "}
          <span>
            <img src={Logo} alt="BookMyShow Logo" />
          </span>
        </h1>
        <section className="mw-500 text-center px-3">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ role: "user" }}
          >
            <Form.Item
              label="Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[
                { required: true, message: "Name is required" },
                { message: "Please enter your Name" },
              ]}
            >
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                autoComplete="off"
              ></Input>
            </Form.Item>
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
                autoComplete="email"
                placeholder="Enter your email"
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
                autoComplete="off"
                placeholder="Enter your password"
              ></Input.Password>
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              htmlFor="confirm_password"
              name="confirm_password"
              className="d-block"
              rules={[
                { required: true, message: "Confirm Password is required" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="Re-enter your password"
                autoComplete="new-password"
              ></Input.Password>
            </Form.Item>
            <Form.Item className="d-block">
              <Button
                type="primary"
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
                block
              >
                Register
              </Button>
            </Form.Item>
            <Form.Item
              label="Register as a Partner"
              htmlFor="role"
              name="role"
              className="d-block text-center"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <div className="d-flex justify-content-center">
                <Radio.Group
                  name="role"
                  className="flex-start"
                  defaultValue={"user"}
                >
                  <Radio name="role" value={"partner"}>
                    Yes
                  </Radio>
                  <Radio name="role" value={"user"}>
                    No
                  </Radio>
                </Radio.Group>
              </div>
            </Form.Item>
          </Form>
          <Form.Item>
            <span>Already a user?</span>
            <Link to="/login"> Login Here</Link>
          </Form.Item>
        </section>
      </main>
    </>
  );
};

export default Register;
