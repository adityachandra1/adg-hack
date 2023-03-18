import React, { useState } from "react";
import { List, Checkbox } from "antd";

const data = [
  { roomNumber: 101, blockNumber: "IC" },
  { roomNumber: 102, blockNumber: "IC" },
  { roomNumber: 201, blockNumber: "AB5" },
  { roomNumber: 202, blockNumber: "AB3" },
  { roomNumber: 203, blockNumber: "AB3" },
  { roomNumber: 204, blockNumber: "AB3" },
  { roomNumber: 506, blockNumber: "IC" },
];

const BookRooms = () => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleToggle = (item) => {
    const currentIndex = checkedItems.indexOf(item);
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(item);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    setCheckedItems(newCheckedItems);
  };
  return (
    <List
      header={<div>Room List</div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          style={{
            backgroundColor: checkedItems.includes(item) ? "#f0f0f0" : "#7ad7eb",
            cursor: "pointer",
          }}
          onClick={() => handleToggle(item)}
        >
          <Checkbox checked={checkedItems.includes(item)} />
          <List.Item.Meta
            title={`Room ${item.roomNumber}`}
            description={`Block ${item.blockNumber}`}
            style={{ color: "white", width: "200px" }}
          />
        </List.Item>
      )}
    />
  );
};

export default BookRooms;
