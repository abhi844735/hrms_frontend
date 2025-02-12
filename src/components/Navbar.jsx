import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";


const Navbar = () => {
  const { isLoggedin, setIsLoggedin } = useContext(AppContext);
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const navigation = useNavigate();

  const handleLogout = async () => {
    try {
      // await axios.get(`${window.apiURL}/auth/logout`, {
      //   // withCredentials: true, // Important for cookies
      // });

      setIsLoggedin(false);
      localStorage.removeItem("user_data");
      localStorage.removeItem("token");

      navigation("/login");
      toast.success("Logout Successfully");
    } catch (error) {
        console.log(error);
        
      toast.error("Error in Logout");
    }
  };

  return (
    <div className="w-full md:h-14 h-12 flex justify-between px-7 md:px-20 items-center bg-gray-800 text-white">
      <div className="hidden md:flex md:flex-row md:gap-10 md:items-center">
        {isLoggedin && (
          <div className="text-2xl font-bold">
            <Link to={"/"}>Dashboard</Link>
          </div>
        )}

        {isLoggedin && userData.role == "employee" && (
          <div className="text-2xl font-bold">
            <Link to={"/leave-section"}>Leave Section</Link>
          </div>
        )}

        {isLoggedin && userData.role == "hr" && (
            <>
            <div className="text-2xl font-bold">
              <Link to={"/add-employee"}>Add Employee</Link>
            </div>
            <div className="text-2xl font-bold">
              <Link to={"/all-employee"}>All Employee</Link>
            </div>
            <div className="text-2xl font-bold">
              <Link to={"/hr-leave-section"}>Hr Leave Section</Link>
            </div>
            </>
        )}

        {isLoggedin && (
          <div className="flex gap-7 text-sm md:text-lg font-semibold">
            <button
              onClick={handleLogout}
              className="border-2 border-blue-800 bg-blue-800 px-3 py-1 rounded hover:bg-linear-to-r from-sky-500 to-indigo-700 hover:text-gray-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
