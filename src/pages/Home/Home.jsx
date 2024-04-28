import axios from 'axios'
import React, { useEffect, useState } from 'react'
import requests from "../../config";
import { useNavigate } from 'react-router-dom';

const Home = () => {
   const [data, setData] = useState();
   const baseurl = requests.Baseurl
  useEffect(() =>{
    axios.get(`${baseurl}/addproduct/`)
    .then((response) =>{
        setData(response.data)
        console.log(response.data)
    })
    .catch((error) =>{
        console.log(error);
    })
  },[])

  const navigate = useNavigate();
  
  const handleClick = (productId) =>{
    navigate(`/singleproduct?productId=${productId}`)
  }


    

  return (
   <div className="p-20 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data && data.map((product) => (
        <div
          key={product.id}
          className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl cursor-pointer"
          onClick={() => handleClick(product.id)}
        >
          <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
            <img
               src={`${baseurl}${product.image}`}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6">
            <div className=" items-center  mb-2">
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                {product.name}
              </p>
            </div>
            <p className="block font-sans text-base antialiased font-bold leading-normal text-gray-700 opacity-75">
             ${product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home