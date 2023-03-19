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
import axios from "axios";

const { TextArea } = Input;

const SendRequest = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [formState, setFormState] = useState({
    isUrgent: false,
    name: "",
    type: "",
    deadline: "",
    details: "",
    fileList: [],
  });

  const handleChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFinish = (values) => {
    const toastId = toast.loading("Sending...");
    // POST request using axios.
    axios
      .post("https://18ba-45-112-144-46.in.ngrok.io/api/v1/requests/", {
        requester: formState.name,
        resourceType: formState.type,
        requestContent: formState.details,
      })
      .then(function (res) {
        //   Save the requests in the state
        console.log(res);
        toast.success("Sent request successfully!", {
          id: toastId,
        });
      });
  };

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
          <Radio.Group onChange={(e) => handleChange("isUrgent", e.target.value)}>
            <Radio value={true}> Urgent? </Radio>
            <Radio value={false}> Not urgent </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Name">
          <Input onChange={(e) => handleChange("name", e.target.value)} />
        </Form.Item>
        <Form.Item label="Type">
          <Select onChange={(value) => handleChange("type", value)}>
            <Select.Option value="Conference Room">Conference Room</Select.Option>
            <Select.Option value="Laptop">Laptop</Select.Option>
            <Select.Option value="Super Computer">Super Computer</Select.Option>
            <Select.Option value="Projector">Projector</Select.Option>
            <Select.Option value="WhiteBoard">WhiteBoard</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Deadline">
          <DatePicker onChange={(date, dateString) => handleChange("deadline", dateString)} />
        </Form.Item>
        <Form.Item label="Details">
          <TextArea rows={4} onChange={(e) => handleChange("details", e.target.value)} />
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
