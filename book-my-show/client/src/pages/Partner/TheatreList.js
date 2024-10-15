import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllTheatres } from "../../api/theatres";
import { Button, message, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TheatreFormModal from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal";
import ShowModal from "./ShowModal"

const TheatreList = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const { user } = useSelector((state) => state.users);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllTheatres(user._id);
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

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      dataIndex: "isActive",
      key: "status",
      render: (status, data) => {
        if (data.isActive) {
          return `Approved`;
        } else {
          return `Pending / Blocked`;
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
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedTheatre(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTheatre(data);
              }}
            >
              <DeleteOutlined />
            </Button>
            {data.isActive && (
              <Button
                onClick={() => {
                  setIsShowModalOpen(true);
                  setSelectedTheatre(data);
                }}
              >
                + Shows
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
        }}
      >
        Add Theatre
      </Button>
      <Table dataSource={theatres} columns={columns} />
      {isModalOpen && (
        <TheatreFormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteTheatreModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}
      {isShowModalOpen && (
        <ShowModal
          isShowModalOpen={isShowModalOpen}
          setIsShowModalOpen={setIsShowModalOpen}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
        />
      )}
    </div>
  );
};

export default TheatreList;
