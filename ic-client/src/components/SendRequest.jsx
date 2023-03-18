import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from "antd";
import BookRooms from "./BookRooms";
import toast from "react-hot-toast";

const { TextArea } = Input;

const onFinish = (values) => {
  // const toastId = toast.loading("Logging in...");
  toast.success("Logged in successfully!");
  //   console.log("Hello");
  // setTimeout(() => {
  //   const res = toast.error("Sent request successfully!", {
  //     id: toastId,
  //   });
  //   console.log(res);
  // }, 1500);
};

const SendRequest = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);

  return (
    <div className="requestWrapper">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ maxWidth: 600, paddingLeft: 30, paddingTop: 20 }}
        onFinish={onFinish}
        className="reqForm"
      >
        <Form.Item label="Urgent">
          <Radio.Group>
            <Radio value="emergency"> Urgent? </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Name">
          <Input />
        </Form.Item>
        <Form.Item label="Type">
          <Select>
            <Select.Option value="Conference Room">Conference Room</Select.Option>
            <Select.Option value="Laptop">Laptop</Select.Option>
            <Select.Option value="Super Computer">Super Computer</Select.Option>
            <Select.Option value="Projector">Projector</Select.Option>
            <Select.Option value="WhiteBoard">WhiteBoard</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Deadline">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Details">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        {/* Add event listener. */}
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Submit Request
          </Button>
        </Form.Item>
      </Form>
      <BookRooms className="bookRooms" />
    </div>
  );
};

export default SendRequest;
