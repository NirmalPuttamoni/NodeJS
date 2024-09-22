import React, { useEffect } from 'react'
import { message } from "antd"
import { Link } from 'react-router-dom';
import { GetCurrentUser } from '../../api/users';

const Home = () => {
  // useEffect(() => {
  //   console.log("Home use effect");
  //   const fecthUser = async () => {
  //     const response = await GetCurrentUser();
  //     if (response && response.success) {
  //       message.success(response.message)
  //     } else {
  //       message.error(response.message);
  //     }
  //   };
  //   fecthUser();
  // })
  return (
    <div>
      <h1>Home Page</h1>
      {/* <button onClick={changeHandler}>Get Users</button> */}
      <br />
      <Link to="/login">Login</Link>
      <div>
        <h1>Users</h1>
        <div>
          {/* {dataFromBackend.map(item => <h5>{item.name}</h5>)} */}
        </div>
      </div>
    </div>
  )
}

export default Home;