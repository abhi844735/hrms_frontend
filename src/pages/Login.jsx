import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import login from "../assets/login_image.jpg";

function Login() {
  const [email, setEmail] = useState("");
  // console.log(email);
  const [password, setPassword] = useState("");
  const { setIsLoggedin } = useContext(AppContext);
  const navigation = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${window.apiURL}/auth/login`,
        {
          email,
          password,
        },
        {withCredentials: true}
      );
      
      if (response?.status == 200) {
        localStorage.setItem(
          "user_data",
          JSON.stringify(response?.data?.user)
        );
        setIsLoggedin(true);
        navigation("/");
        toast.success(response?.data.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-wrap bg-gray-200">
      {/* Left Section */}
      <div className="h-[100vh] w-[100%] md:w-[50%]">
        <img className="h-[100%] w-[100%]" src={login} alt="" />
      </div>

      {/* Right Section */}
      <div className="mx-auto my-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <IoArrowBack className="text-4xl" onClick={() => navigation(-1)} /> */}
          <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
            Login in to your Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  required
                  className="block w-full rounded-md bg-white px-5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="block w-full rounded-md bg-white px-5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-xl cursor-pointer font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-10"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        {/* <div className="text-end mt-2 text-lg">
          Not a member? <span className="font-semibold text-blue-800"><Link to={"/signup"}>Register</Link></span>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
