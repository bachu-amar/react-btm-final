import React, { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import axios from "axios";

const GetAllVideoMessage = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://ec2-15-207-196-141.ap-south-1.compute.amazonaws.com:8080/v1/video/getall"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://ec2-15-207-196-141.ap-south-1.compute.amazonaws.com:8080/v1/message/update/${selectedItem._id}`,
        { /* Updated data */ }
      );
      console.log("Update successful:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://ec2-15-207-196-141.ap-south-1.compute.amazonaws.com:8080/v1/message/delete/${selectedItem._id}`
      );
      console.log("Delete successful:", response.data);
      fetchData();
      setSelectedItem(null);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const columns = [
    {
      title: "Message Title",
      dataIndex: "MessageTitle",
      key: "MessageTitle",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "YouTube URL",
      dataIndex: "YouTube_Url",
      key: "YouTube_Url",
    },
    {
      title: "Banner",
      dataIndex: "Banner_Location",
      key: "Banner_Location",
      render: (text) => <img src={text} alt="Banner" style={{ width: "50px" }} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button onClick={() => setSelectedItem(record)}>Update</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Video Messages</h1>
      <Table dataSource={data} columns={columns} rowKey="_id" />

      {selectedItem && (
        <div>
          <h2>Selected Item</h2>
          <p>Title: {selectedItem.MessageTitle}</p>
          <p>Description: {selectedItem.description}</p>
          <p>YouTube URL: {selectedItem.YouTube_Url}</p>
          <img src={selectedItem.Banner_Location} alt="Banner" />

          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      )}
    </div>
  );
};

export default GetAllVideoMessage;
