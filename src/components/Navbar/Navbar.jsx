import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isSuperuser, setIsSuperuser] = useState(false);

  useEffect(() =>{
    const usertoken = Cookies.get("token")

    if (usertoken){
      setIsLoggedIn(true);
      try{
        const decodeToken = jwtDecode(usertoken);
        const username = decodeToken.username;
        const superuserStatus = decodeToken.is_superuser;
        console.log(username);
        console.log(superuserStatus);

        setIsSuperuser(superuserStatus)
        setUsername(username) 
      }catch(error){
        console.error("Error decoding JWT token:", error)
        setIsLoggedIn(false);
        setUsername("");
      }
    }else{
      setIsLoggedIn(false);
      setUsername("");
    }
  },[])

  const navigate = useNavigate();
  const handleClickSignup = () =>{
    navigate(`/register`)
  }
  const handleClickLogin = () =>{
    navigate(`/login`)
  }
  const handleClickHome = () =>{
    navigate(`/`)
  }

  const handleAddproductPage = () =>{
    navigate('/addproduct')
  }
  const handleAddCategoryPage = () =>{
    navigate('/addcategory')
  }


  const handleLogout = () => {
    
    Cookies.remove("token"); 
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-evenly md:gap-10 items-center p-4">
    <div className="flex list-none gap-5 md:gap-10 text-xl font-semibold text-gray-500 mb-4 md:mb-0">
      <li className="cursor-pointer hover:text-black" onClick={handleClickHome}>
        Home
      </li>
      <li className="cursor-pointer hover:text-black">Category</li>
      <li className="cursor-pointer hover:text-black">About</li>
      <li className="cursor-pointer hover:text-black">Contact</li>
    </div>

    <div className=" flex flex-col md:mr-10 text-center md:text-left">
      <h1 className="text-4xl font-playfair font-extrabold mb-2 md:mb-0">SwiftCart</h1>
      <p className="font-semibold text-gray-500 text-sm">E C O M M E R C E</p>
    </div>

    {isLoggedIn ? (
      <div className="flex md:flex-row gap-3 items-center">
        <span className="text-gray-500 text-xl font-medium mr-2">{`Hello, ${username}!`}</span>
        {isSuperuser && (
          <><Button label="Add Product" onClick={handleAddproductPage} /><Button label="Add Category" onClick={handleAddCategoryPage} /></>
        )}
        <Button label="Logout" onClick={handleLogout} />
      </div>
    ) : (
      <div className="flex  md:flex-row gap-3">
        <Button label="Login" onClick={handleClickLogin} />
        <Button label="Signup" onClick={handleClickSignup} />
      </div>
    )}
  </div>
  );
};

export default Navbar;
