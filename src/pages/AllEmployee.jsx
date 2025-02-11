import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const AllEmployee = () => {
  const [employeeData, setEmployeeData] = useState();
  const [name,setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function getEmployeeData() {
    setLoading(true);
    try {
      const response = await axios.get(`${window.apiURL}/employees/getAllEmployeesDetail?name=${name}`, { withCredentials: true });
      // console.log(response);
      setEmployeeData(response);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    getEmployeeData();
  }, [name])
  const handleEmployeeDelete = async (id) => {
    Swal.fire({
      title: "Are you sure",
      text: "You want to Delete Employee",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true)
        try {
          const response = await axios.delete(`${window.apiURL}/employees/delete/${id}`, {
            withCredentials: true, // Important for cookies
          });
          toast.success("Employee Deleted Successfully");
          getEmployeeData();
        } catch (error) {
          console.log(error);
          if (!error?.response?.data?.success) {
            toast.error("Error in deleting Employee");
          }
        }finally{
          setLoading(false)
        }
      }
    });
  };
  return (
    <div className='bg-gray-100 h-[92vh] pt-4 flex flex-col flex-wrap'>
     <div className="mt-2 mb-2 p-2">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  placeholder="search by employee name"
                  className="rounded-md py-2 px-10 bg-white text-base text-black outline-1 -outline-offset-1 outline-black-300 placeholder:text-black-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
      <div className='bg-white flex justify-center items-center rounded-md shadow-2xl shadow-gray-400 mx-2 py-2'><h1 className='text-3xl font-semibold'>All Employee List</h1></div>
      <div className='h-0.5 bg-gray-500 rounded-md mx-2 my-3'></div>
      {/* {loading ? (<div className='text-5xl'>Loading ...</div>) : (employeeData?.data?.[1]?.username)}
        {loading && <div className='text-5xl'>Loading</div>}
        {employeeData?.data?.[1]?.username} */}
      <div className='flex justify-center items-center flex-wrap rounded-md shadow-2xl shadow-gray-400 mx-2 py-2'>
        {loading ? (
          <div className=''>
            Loading.....
          </div>
        ) : (
          <table className='w-full text-lg text-left'>
            <thead className='text-lg uppercase bg-green-700 text-white'>
              <tr>
                <th scope='col' className='px-6 py-2 text-center'>S.No.</th>
                <th scope='col' className='px-6 py-1'>Name</th>
                <th scope='col' className='px-6 py-1'>Email</th>
                <th scope='col' className='px-6 py-1'>Contact</th>
                <th scope='col' className='px-6 py-1'>Department</th>
                <th scope='col' className='px-14 py-1 text-center'>Delete</th>
              </tr>
            </thead>
            <tbody className='text-[16px] text-gray-500'>
              {employeeData?.data?.map((item, i) => (
                <tr className='text-md font-normal  even:bg-gray-200' key={item._id}>
                  <th scope='col' className='px-6 py-2 text-center'>{i + 1}</th>
                  <th scope='col' className='px-6 py-2 text-left'>{item?.name}</th>
                  <th scope='col' className='px-6 py-2 text-left'>{item?.email}</th>
                  <th scope='col' className='px-6 py-2 text-left'>{item?.contact}</th>
                  <th scope='col' className='px-6 py-2 text-left'>{item?.department}</th>
                  <th scope='col' className='pl-30 py-2 text-center hover:bg-gray-300'><MdDelete className='text-xl cursor-pointer' onClick={() => handleEmployeeDelete(item._id)} /></th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AllEmployee