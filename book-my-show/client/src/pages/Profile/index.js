import React, { useEffect } from "react";
import Bookings from "./Bookings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== "user") {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    user.role === "user" && (
      <div>
        <Bookings />
      </div>
    )
  );
};

export default Profile;
