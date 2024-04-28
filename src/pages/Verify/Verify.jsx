import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import requests from '../../config';
import Cookies from 'js-cookie';

const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("userid");
  const navigate = useNavigate();

  const [input, setInput] = useState({
    user: id,
    otp: "",
    // email
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
    console.log(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseUrl = requests.Baseurl

    axios.post(`${baseUrl}/verifyotp/`,input)
    .then((response) =>{
        console.log(response.data);
        const token = response.data.token
        Cookies.set('token',token,{expires:7})
        window.location.href="/"
    }).catch((error) =>{
        console.log(error);
    })
  }




  return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div class="w-1/2 my-6 mx-auto p-6 bg-gray-300 rounded-xl flex flex-col gap-5 text-center items-center">
        <h1 className="text-3xl">Verify Otp</h1>
        <form onSubmit={handleSubmit} class="mb-3 flex flex-col items-center gap-4">
        <div class="mb-3 flex flex-col">
            <input
              class="ml-2 rounded-md w-72 p-2"
              type="text"
              name="otp"
              onChange={handleChange}
            />
          </div>
          <button
              type="submit"
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign up
            </button>

        </form>
        </div>
      </div>
  )
}

export default Verify