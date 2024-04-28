import React, { useState } from 'react'
import requests from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addcategory = () => {

  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  const handleAddCategory = (e) =>{
    e.preventDefault();

    const Baseurl = requests.Baseurl
    axios.post(`${Baseurl}/addcategory/`, { category_name: categoryName })
    .then((response) =>{
        console.log(response.data);
        navigate('/addproduct')

    }).catch((error) =>{
        console.log(error);
    })
  }

  const handleChangeCategory = (e) => {
    setCategoryName(e.target.value);
  };
  return (
    <div class="w-1/2 my-6 mx-auto p-6 bg-gray-300 rounded-xl">
        <div class="p-7">
          <h1 class="mb-6 text-3xl">Add Category</h1>
        </div>
        <form method="post" onSubmit={handleAddCategory}>
          <div class="mb-4">
            <label
              for="category_name"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Category Name:
            </label>
            <input
              type="text"
              id="category_name"
              name="name"
              onChange={handleChangeCategory}
              class="w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            />
          </div>
          <div class="mb-6">
            <button
              type="submit"
              class="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:shadow-outline-blue active:bg-teal-800"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
  )
}

export default Addcategory