import React, { useState } from 'react'
import axios from "axios"

const Home = () => {
  const [dataFromBackend, setDataFromBackend] = useState("");
  const changeHandler = ()=>{
    axios.get("/api/products")
    .then(res => setDataFromBackend(res.data))
  }
  return (
    <div>
      <h1>Home</h1>
      <button onClick={changeHandler}>Click</button>
      <h2>{dataFromBackend}</h2>
    </div>
  )
}

export default Home;