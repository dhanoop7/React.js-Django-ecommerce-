import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../../config";

const Addproduct = () => {

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  })

  const [categories, setCategories] = useState([]);

  useEffect(() =>{
    const Baseurl = requests.Baseurl
    axios.get(`${Baseurl}/addcategory/`)
    .then((response) =>{
      console.log(response.data);
      setCategories(response.data);
    }).catch((error) =>{
      console.log(error);
    })
  },[]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setProductData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handelSubmit = (e) =>{
    e.preventDefault();

    const Baseurl = requests.Baseurl;
    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    axios.post(`${Baseurl}/addproduct/`, formData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  
  }
  return (
    <div>

      <div class="w-1/2 my-6 mx-auto p-6 bg-gray-300 rounded-xl">
        <div class="p-7">
          <h1 class="mb-6 text-3xl">Add Product</h1>
        </div>
        <form method="post" action="" enctype="multipart/form-data" onSubmit={handelSubmit}>
          <div class="mb-3 flex flex-col">
            <label class="inline-block mb-2">Product Title:</label>
            <input
              class="ml-2 rounded-md w-72 p-2"
              type="text"
              id="product_title"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </div>

          <div class="mb-3 flex flex-col">
            <label class="inline-block mb-2">Product Description:</label>
            <textarea
              class="ml-2 rounded-md w-72 p-2"
              id="product_description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              
            ></textarea>
          </div>

          <div class="mb-3 flex flex-col">
            <label class="inline-block mb-2">Product Price:</label>
            <input
              class="ml-2 rounded-md w-72 p-2"
              type="text"
              id="product_price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              
            />
          </div>

          <div class="mb-3 flex flex-col">
            <label class="inline-block mb-2">Product Category:</label>
            <select
              className="ml-2 rounded-md w-72 p-2"
              name="category"
              value={productData.category}
              onChange={handleChange}
              
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div class="mb-3 flex flex-col">
            <label class="inline-block mb-2">Product Image:</label>
            <input
              class="ml-2"
              type="file"
              id="product_image"
              name="image"
              onChange={handleChange}
             
            />
          </div>

          <div class="p-7 flex">
            <button
              class="py-4 px-8 text-lg bg-teal-500 text-white hover:bg-teal-700 rounded-xl"
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
