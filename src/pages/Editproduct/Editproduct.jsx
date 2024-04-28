import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate, useSearchParams } from 'react-router-dom';
import requests from '../../config';

const Editproduct = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const productId = searchParams.get("productId");
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState('');

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
    });

    const [categories, setCategories] = useState([]);
    const Baseurl = requests.Baseurl

    useEffect(() => {
        const fetchData = async () => {
          try {
        
            const categoryResponse = await axios.get(`${Baseurl}/addcategory/`);
            setCategories(categoryResponse.data);
    
    
            const productResponse = await axios.get(`${Baseurl}/singleproduct/${productId}`);
            setProductData({
              name: productResponse.data.name,
              description: productResponse.data.description,
              price: productResponse.data.price,
              category: productResponse.data.category,
              image: productResponse.data.image,
            });
            setImagePreview(`${Baseurl}/${productResponse.data.image}`);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [Baseurl]);

      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
      
        if (type === 'file') {
          setProductData((prevData) => ({
            ...prevData,
            [name]: files[0],
          }));
      
          // Update image preview
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
      
          if (files[0]) {
            reader.readAsDataURL(files[0]);
          } else {
            setImagePreview('');
          }
        } else {
          setProductData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
      
        const formData = new FormData();
      
        Object.keys(productData).forEach((key) => {
          // Check if the key is 'image' and if it's a File object
          if (key === 'image' && productData[key] instanceof File) {
            formData.append(key, productData[key]);
          } else {
            formData.append(key, productData[key]);
          }
        });
      
        axios.post(`${Baseurl}/editproduct/${productId}/`, formData)
          .then((response) => {
            console.log(response.data);
            navigate(`/singleproduct?productId=${productId}`);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      
  return (
    <div>
    <div className="w-1/2 my-6 mx-auto p-6 bg-gray-300 rounded-xl">
      <div className="p-7">
        <h1 className="mb-6 text-3xl">Edit Product</h1>
      </div>
      <form method="post" action="" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="mb-3 flex flex-col">
          <label className="inline-block mb-2">Product Title:</label>
          <input
            className="ml-2 rounded-md w-72 p-2"
            type="text"
            id="product_title"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 flex flex-col">
          <label className="inline-block mb-2">Product Description:</label>
          <textarea
            className="ml-2 rounded-md w-72 p-2"
            id="product_description"
            name="description"
            value={productData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3 flex flex-col">
          <label className="inline-block mb-2">Product Price:</label>
          <input
            className="ml-2 rounded-md w-72 p-2"
            type="text"
            id="product_price"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 flex flex-col">
          <label className="inline-block mb-2">Product Category:</label>
          <select
            className="ml-2 rounded-md w-72 p-2"
            name="category"
            value={productData.category}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3 flex flex-col">
          <label className="inline-block mb-2">Product Image:</label>
          {imagePreview && (
    <img src={imagePreview} alt="Product Preview" className="mb-2 rounded-md w-72" />
  )}
          <input className="ml-2" type="file" id="product_image" name="image" onChange={handleChange} />
        </div>

        <div className="p-7 flex">
          <button
            className="py-4 px-8 text-lg bg-teal-500 text-white hover:bg-teal-700 rounded-xl"
            type="submit"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Editproduct