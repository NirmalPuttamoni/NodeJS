import React, { useState } from 'react'
import axios from "axios"
import { message } from "antd"

const Home = () => {
  const [dataFromBackend, setDataFromBackend] = useState([]);
  const changeHandler = async () => {
    try {
      const res = await axios.get("/api/users/");
      setDataFromBackend(res.data.data)
      console.log(dataFromBackend);
    } catch (error) {
      console.error("-------", error);
      message.error(error?.response?.data?.message || error?.message);
    }
  }
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={changeHandler}>Get Users</button>
      <div>
        <h1>Users</h1>
        <div>
          {dataFromBackend.map(item => <h5>{item.name}</h5>)}
        </div>
      </div>
    </div>
  )
}

export default Home;