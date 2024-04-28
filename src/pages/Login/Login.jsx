import React, { useState } from "react";
import axios from "axios";
import requests from "../../config";
import Cookies from 'js-cookie';

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
    console.log(data);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl = requests.Baseurl;

    axios.post(`${baseUrl}/login/`, data)
    .then((response) => {
      console.log(response.data);
      const token = response.data.token
        Cookies.set('token',token,{expires:7})
      window.location.href="/"
    }).catch((error) =>{
        console.log(error);
    }) 
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 my-6 mx-auto p-6 bg-gray-300 rounded-xl">
        <div className="p-7">
          <h1 className="mb-6 text-3xl">Login</h1>
          <p className="text-sm text-gray-500">.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="mb-3 flex flex-col">
              <label className="inline-block mb-2">Username</label>
              <input
                className="ml-2 rounded-md w-full sm:w-72 p-2"
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="mb-3 flex flex-col">
              <label className="inline-block mb-2">Password</label>
              <input
                className="ml-2 rounded-md w-full sm:w-72 p-2"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-5">
          <button
              type="submit"
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
