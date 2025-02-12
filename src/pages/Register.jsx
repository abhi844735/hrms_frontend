import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function Signup() {
  // const navigation = useNavigate();
  const [formData, setFormDat] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    role: "",
    contact: ""
  });

  const handleInputChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;

    setFormDat((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field based on 'name'
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${window.apiURL}/auth/register`, formData, {
        headers: { "Content-Type": "application/json",
          Authorization:`${localStorage.getItem("token")}`
         }, 
        // withCredentials: true
        
      });

      if (res?.status == 201) {
        toast.success(res?.data?.message);
        // navigation("/");
        setFormDat({
          name: "",
          email: "",
          password: "",
          department: "",
          role: "",
          contact: ""
        })
      }
    } catch (error) {
      console.log(error);

      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
      toast.error(error?.message);
    }
  };

  return (
    <div className="bg-white w-full h-[92vh] flex justify-center items-center">
      <div className="bg-gray-100 rounded-xl shadow-2xl h-[85vh] w-[30%] mt-5">
        <div className="flex flex-row justify-center mt-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Register new employee
          </h2>
        </div>

        <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your Name"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter ypur Email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-md font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your Password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="department"
                  className="block text-md font-medium text-gray-900"
                >
                  Department
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Enter your Department"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="role"
                  className="block text-md font-medium text-gray-900"
                >
                  Role
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="Enter your Last Role"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="contact"
                  className="block text-md font-medium text-gray-900"
                >
                  Contact
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder="Enter your Contact"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 mt-5 py-1.5 text-lg font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
