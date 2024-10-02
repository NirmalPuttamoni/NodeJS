import { Button, Form, Input, message, Radio } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import Logo from "../../assets/book-my-show-logo.svg"
import { RegisterUser } from '../../api/users';

const Register = () => {
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      console.log("response : ", response)
      if (response?.success) {
        //success
        message.success(response.message);
      } else {
        // error
        message.error(response.message);
      }
    } catch (error) {
      console.log(error)
      message.error("Something went wrong");
    }
  }
  return (
    <>
      <main className="App-header">
        <h1 style={{ display: "flex", gap: "10px", height: "30px" }}>Register to{" "}
          <span >
            <img src={Logo} alt="BookMyShow Logo" />
          </span>
        </h1>
        <section className='mw-500 text-center px-3'>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              htmlFor="name"
              name="name"
              className='d-block'
              rules={[
                { required: true, message: "Name is required" },
                { type: "text", message: "Please enter your Name" }
              ]}
            >
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className='d-block'
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" }
              ]}
            >
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className='d-block'
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              ></Input.Password>
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              htmlFor="Confirm password"
              name="confirm_password"
              className='d-block'
              rules={[{ required: true, message: "Confirm Password is required" }]}
            >
              <Input.Password
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="Re-enter your password"
              ></Input.Password>
            </Form.Item>
            <Form.Item className='d-block'>
              <Button
                type='primary'
                htmlType='submit'
                style={{ fontSize: "1rem", fontWeight: "600" }}
                block
              >Register</Button>
            </Form.Item>
            <Form.Item
              label="Register as a Partner"
              htmlForm="role"
              name="role"
              className="d-block tet-center"
              initialValue={"user"}
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <div className="d-flex justify-content-start">
                <Radio.Group name="radiogroup" className="flex-start">
                  <Radio value={"partner"}>Yes</Radio>
                  <Radio value={"user"}>No</Radio>
                </Radio.Group>
              </div>
            </Form.Item>
          </Form>
          <div>
            <p>Already a user?
              <Link to="/login">
                {" "}Login Here
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Register;