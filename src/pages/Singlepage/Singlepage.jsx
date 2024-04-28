import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import requests from "../../config";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Singlepage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const [data, setData] = useState();
  const Baseurl = requests.Baseurl;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState();
  const navigate = useNavigate();

  const handleEdit = (productId) =>{
    navigate(`/editproduct?productId=${productId}`)
  }

  useEffect(() => {
    const userToken = Cookies.get("token");
    console.log(userToken);

    if (userToken) {
      setIsLoggedIn(true);
      try {
        const decodeToken = jwtDecode(userToken);
        const userId = decodeToken.id;
        setIsSuperuser(decodeToken.is_superuser);
      } catch {
        console.log("Error decoding JWT token:");
        setIsLoggedIn(false);
        setIsSuperuser(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsSuperuser(false);
    }

    axios
      .get(`${Baseurl}/singleproduct/${productId}/`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${Baseurl}/addreview/?product_id=${productId}`)
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(productId);

  const handleChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usertoken = Cookies.get("token");
    const decodeToken = jwtDecode(usertoken);
    const userId = decodeToken.id;

    const reviewData = {
      rating: 5,
      comment: reviewText,
      user: userId,
      product: productId,
    };
    console.log(reviewData);

    axios
      .post(`${Baseurl}/addreview/?product=${productId}/`, reviewData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete =(e) =>{
    e.preventDefault();
    const productid = productId
    axios.post(`${Baseurl}/deleteproduct/${productid}/`)
    .then((response) =>{
      console.log(response.data);
      navigate('/')
    }).catch((error) =>{
      console.log(error);
    })
  }
  


  return (
    <div className="p-10">
      {data ? (
        <div className="flex justify-evenly">
          <div className="col-span-3">
            <img src={`${Baseurl}${data.image}`} alt={data.name} />
          </div>
          <div className="col-span-2 p-6 bg-slate-100 rounded-xl flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="mb-6 text-3xl">{data.name}</h1>
              <p className="text-gray-500">
                <strong>Price: </strong>
                {data.price}
              </p>

              <p className="text-gray-700">
                <strong className="text-gray-500">Description:</strong>
                {data.description}
              </p>

              {isLoggedIn && (
                <div className="mt-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
                    Add to Cart
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Buy Now
                  </button>

                  <form className="mt-4" onSubmit={handleSubmit}>
                    <textarea
                      placeholder="Write your review here..."
                      className="w-full h-20 p-2 border rounded"
                      value={reviewText}
                      onChange={handleChange}
                    ></textarea>
                    <button
                      type="submit"
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Submit Review
                    </button>
                  </form>

                  <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2">Product Reviews</h2>
                    {reviews.map((review) => {
                      <div key={review.id} className="mb-2">
                        <p className="">{review.comment}</p>
                        <p className="">
                          Rating: {review.rating}, User: {review.user}
                        </p>
                      </div>;
                    })}
                  </div>

                  {isLoggedIn && isSuperuser && (
                    <div className="mt-4">
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-4" onClick={ () => handleEdit(productId)}>
                        Edit Product
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
                        Delete Product
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Singlepage;
