import React, { useState } from "react";
import { Row, Col, Card, Button } from "antd";
import { AiFillFilePdf, AiOutlineMail } from "react-icons/ai";
import image1 from "../../image1.png";
import image2 from "../../image2.png";
import Feed from "./Feed";
import axios from "axios";

const Dashboard = () => {
  const [size, setSize] = useState("large");
  const generateReport = () => {
    // Call the API endpoint.
    // axios
    //   .get("http://localhost:3000/api/v1/startup/pdf?startupId=64155a758df3c40dc8e16a15")
    //   .then((response) => {
    //     console.log(response);
    //   });
    console.log("Successfully generated report.");
    var filePath =
      "https://drive.google.com/file/d/1vhYT8o2pLtzCfqyQysvSKuwS5qAwBhr4/view?usp=share_link";
    var link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf("/") + 1);
    link.click();
  };

  const rollForm = () => {
    // redirect to /requestForm
    window.location.href = "http://localhost:5173/requestForm";
  };

  return (
    <div>
      <h1 className="dash-title">My Dashboard</h1>
      <Row gutter={16}>
        <Col span={12}>
          <Card style={{ width: 200 }}>
            <img
              src={image1}
              alt="Image 1"
              width={300}
              height={300}
              style={{ marginLeft: "1rem" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ width: 200 }}>
            <img src={image2} alt="Image 2" width={400} height={300} />
          </Card>
        </Col>
      </Row>
      <Feed />
      <div className="btnWrapper">
        <Button
          type="primary"
          icon={<AiFillFilePdf />}
          size={size}
          className="button-p"
          onClick={generateReport}
        >
          Generate Report
        </Button>
        <br />
        <Button
          type="primary"
          icon={<AiOutlineMail />}
          size={size}
          className="button-p"
          onClick={rollForm}
        >
          Send Request
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
