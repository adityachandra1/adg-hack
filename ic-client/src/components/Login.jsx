import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

const onFinish = (values) => {
  // Wait for 2 seconds.
  const toastId = toast.loading("Logging in...");
  setTimeout(() => {
    toast.success("Logged in successfully!", {
      id: toastId,
    });
    // Redirect to dashboard front end, without using rredirect.
    window.location.href = "http://localhost:5173/dashboard";
  }, 1500);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  return (
    <div className="wrapper">
      <h1 className="loginText">Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
