import React, { useEffect } from "react";
import { Tabs } from "antd";
import TheatreList from "./TheatreList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Partner() {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "partner") {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = [
    {
      key: "1",
      label: "Theatres",
      children: <TheatreList />,
    },
  ];
  return (
    user.role === "partner" && (
      <div>
        <h1>Partner Page</h1>
        <Tabs items={items} />
      </div>
    )
  );
}

export default Partner;
