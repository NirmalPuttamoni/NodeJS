import React from 'react'
import { Button, Input, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/book-my-show-logo.svg"
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        // console.log(values);
        // const {email , password} = values;
        try {
            const data = await axios.post("/api/users/login/", values);
            message.success(data.data.message);
            navigate("/");
        } catch (error) {
            message.error(error.response.data.message)
        }
    }

    return (
        <>
            <main className="App-header">
                <h1 style={{ display: "flex", gap: "10px", height: "30px" }}>Login to{" "}
                    <span >
                        <img src={Logo} alt="BookMyShow Logo" />
                    </span>
                </h1>
                <section className='mw-500 text-center px-3'>
                    <Form layout="vertical" form={form} onFinish={onFinish}>
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
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                            ></Input>
                        </Form.Item>
                        <Form.Item className='d-block'>
                            <Button
                                type='primary'
                                htmlType='submit'
                                style={{ fontSize: "1rem", fontWeight: "600" }}
                                block
                            >Login</Button>
                        </Form.Item>
                    </Form>
                    <div>
                        {/* <p>New user?
                            <Link to="/register">
                            {" "}Register Here
                            </Link>
                        </p> */}
                    </div>
                    <Form.Item>
                        <Link to="/register">
                            <Button
                                type='primary'
                                htmlType='submit'
                                style={{ fontSize: "1rem", fontWeight: "600", background: "green" }}

                            >Create new account</Button>
                        </Link>
                    </Form.Item>

                </section>
            </main>
        </>
    )
}

export default Login