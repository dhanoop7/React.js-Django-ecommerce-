import React, { useState } from "react";
import requests from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [data, setData] = useState({
    username: "r",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl = requests.Baseurl;

   

    axios.post(`${baseUrl}/register/`, data).then((response) => {
      console.log(response.data);
      const user_id = response.data.user_id
      navigate(`/verify?userid=${user_id}`)
    }).catch((error) =>{
        console.log(error);
    }) 
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6">
      <div className="w-full md:w-1/2 my-6 mx-auto p-6 bg-gray-300 rounded-xl">
        <div className="p-7">
          <h1 className="mb-6 text-3xl">Sign Up</h1>
          <p className="text-sm text-gray-500">
            Signup now and get full access to our app.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="mb-3 flex flex-col w-full md:w-1/2">
              <label className="inline-block mb-2">Username</label>
              <input
                className="ml-2 rounded-md w-full p-2"
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 flex flex-col w-full md:w-1/2">
              <label className="inline-block mb-2">Email</label>
              <input
                className="ml-2 rounded-md w-full p-2"
                type="email"
                name="email"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="mb-3 flex flex-col w-full md:w-1/2">
              <label className="inline-block mb-2">Password</label>
              <input
                className="ml-2 rounded-md w-full p-2"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 flex flex-col w-full md:w-1/2">
              <label className="inline-block mb-2">Confirm password</label>
              <input
                className="ml-2 rounded-md w-full p-2"
                type="password"
                name="confirm_password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
