import React from 'react'

const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem("user_data"));
  return (
    <div className="bg-gray-100 w-full h-[93.8vh] pt-4 px-10">
    {/* Employee Info */}
    <div className="flex flex-row bg-white h-[45%] rounded-2xl shadow-lg overflow-hidden">
      <div className="flex justify-center items-center flex-col fbg-gray-300 h-[100%] w-[30%]">
        <img height={"200px"} width={"200px"} className="rounded-[50%] mb-1" src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt="" />
        <h1 className="uppercase text-lg md:text-2xl font-semibold">{userData.name}</h1>
        <p>{userData.role}</p>
      </div>

      <div className="bg-gray-200 h-[100%] w-[70%] text-2xl flex flex-col gap-10">
        <div className="flex flex-row gap-5 bg-white pl-10 mt-5">
          <h1>Name: </h1>
          <p>{userData.name}</p>
        </div>
        <div className="flex flex-row gap-5 bg-white pl-10">
          <h1>email: </h1>
          <p>{userData.email}</p>
        </div>
        <div className="flex flex-row gap-5 bg-white pl-10">
          <h1>Usertype: </h1>
          <p>{userData.role}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Dashboard