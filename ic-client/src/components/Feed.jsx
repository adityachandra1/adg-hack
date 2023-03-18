import { Avatar, List } from "antd";
import React from "react";

const data = [
  {
    title: "InnovWait",
  },
  {
    title: "LaunchPad",
  },
  {
    title: "Innovasphere",
  },
  {
    title: "StartUp",
  },
];

const Feed = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description={`Startup ${index + 1}`}
        />
      </List.Item>
    )}
  />
);

export default Feed;
