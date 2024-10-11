import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllTheatresForAdmin, updateTheatre } from "../../api/theatres";

const TheatresTable = () => {
  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (text, data) => {
        return data?.owner && data?.owner?.name;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, data) => {
        if (data?.isActive) {
          return "Approved";
        } else {
          return "Pending / Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, data) => {
        return (
          <div>
            {data?.isActive ? (
              <Button onClick={() => handleStatusChange(data)}>Block</Button>
            ) : (
              <Button onClick={() =>handleStatusChange(data)}>Approve</Button>
            )}
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllTheatresForAdmin();
      if (response?.success) {
        const allTheatres = response.data;
        setTheatres(
          allTheatres?.map((item) => {
            return { ...item, key: `theatre-${item._id}` };
          })
        );
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const handleStatusChange = async (theatre) => {
    // update the status of theatre
    // call the updateTheatre function
    try {
      dispatch(showLoading());
      const values = {
        ...theatre,
        theatreId: theatre._id,
        isActive: !theatre.isActive,
      };
      const response = await updateTheatre(values);
      if (response?.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Table dataSource={theatres} columns={columns} />
    </div>
  );
};

export default TheatresTable;
