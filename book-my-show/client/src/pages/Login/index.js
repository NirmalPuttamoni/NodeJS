import React from 'react'
import { Button, Input, Form } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <main className="App-header">
                <h1>Login to Book My Show</h1>
                <section className='mw-500 text-center px-3'></section>
                <Form layout="vertical">
                    <Form.Item
                        label="Email"
                        htmlFor="email"
                        name="email"
                        className='d-block'
                        rules={[
                            { required: true, message: "Email is required" },
                            { type: "email", message: "Please enter a valid email" }
                        ]}
                    />
                </Form>
            </main>
        </>
    )
}

export default Login