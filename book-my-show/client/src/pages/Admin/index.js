import React, { useEffect } from "react";
import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatresTable from "./TheatresTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Theatres",
      children: <TheatresTable />,
    },
  ];

  return (
    user.role === "admin" && (
      <div className="admin-page-container">
        <h1>Admin Page</h1>
        <Tabs items={tabItems} />
      </div>
    )
  );
}

export default Admin;
