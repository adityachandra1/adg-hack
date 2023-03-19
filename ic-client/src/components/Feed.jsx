import { Avatar, List, Tag } from "antd";
import React, { useState, useEffect } from "react";
import "../Feed.css";
import axios from "axios";

const data = [
  {
    title: "InnovWait",
    investors: ["VCX", "RapidFire"],
  },
  {
    title: "LaunchPad",
    investors: ["SomnathVentures", "EagleEye"],
  },
  {
    title: "Innovasphere",
    investors: ["SpheroVC", "ZeroInnfinityVentures"],
  },
];

const requestList = [
  {
    name: "Chirag Rao",
    title: "Conference Room Reservation",
    type: "Conference Room",
    details: "Need to reserve the conference room for a meeting with clients.",
    urgent: true,
    timestamp: "2023-03-18 10:30:00",
  },
  {
    name: "Praveen Varma",
    title: "Laptop Request",
    type: "Laptop",
    details: "Need to request a new laptop for development purposes.",
    urgent: false,
    timestamp: "2023-03-17 14:45:00",
  },
];

const Feed = () => {
  const [requests, setRequests] = React.useState([]);

  const getRequests = () => {
    axios
      .get("https://2293-2401-4900-33ba-5800-b2bb-fcf-8925-307.in.ngrok.io/api/v1/requests")
      .then((res) => {
        //   Save the requests in the state
        console.log(res);
        setRequests(res.data);
      });
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div>
      <h1 className="feedH1">Startups Registered:</h1>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item className="feed-item">
            <Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />
            <div className="feed-item-content">
              <div className="feed-item-title">
                <a href="https://ant.design">{item.title}</a>
              </div>
              <div className="feed-item-investors">
                {item.investors.map((investor, index) => (
                  <Tag key={index}>{investor}</Tag>
                ))}
              </div>
            </div>
          </List.Item>
        )}
      />
      <h1 className="feedH1">Requests Issued:</h1>
      <List
        itemLayout="horizontal"
        dataSource={requestList}
        renderItem={(item, index) => (
          <List.Item className="feed-item">
            <Avatar icon={<i className="fas fa-tasks"></i>} />
            <div className="feed-item-content">
              <div className="feed-item-title">
                <a href="https://ant.design">{item.title}</a>
                {item.urgent && <Tag color="red">Urgent</Tag>}
              </div>
              <div className="feed-item-details">
                <div>
                  <strong>Name:</strong> {item.name}
                </div>
                <div>
                  <strong>Type:</strong> {item.type}
                </div>
                <div>
                  <strong>Details:</strong> {item.details}
                </div>
                <div>
                  <strong>Timestamp:</strong> {item.timestamp}
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Feed;
