import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LeaveSection = () => {
  const [leaveType, setLeaveType] = useState("");
  const [leaveDates, setLeaveDates] = useState([]);
  const [reason, setReason] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch logged-in user's leave details
  const fetchLeaves = async () => {
    setLoading(true);
    Swal.fire({
      title: "Loading...",
      text: "Fetching your leave details",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.get(`${window.apiURL}/leaves/loggedInUserLeaves`,
         { 
          // withCredentials: true
          headers:{
            Authorization:`${localStorage.getItem("token")}`
          }
         }
        );
      setLeaves(response.data);
    } catch (error) {
      toast.error("Failed to fetch leaves");
    } finally {
      setLoading(false);
      Swal.close();
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Handle Date Selection
  const handleDateChange = (date) => {
    if (!leaveDates.some((d) => d.getTime() === date.getTime())) {
      setLeaveDates([...leaveDates, date]);
    }
  };

  // Remove Selected Date
  const removeDate = (dateToRemove) => {
    setLeaveDates(leaveDates.filter((date) => date.getTime() !== dateToRemove.getTime()));
  };

  // Handle Leave Application
  const handleApplyLeave = async (e) => {
    e.preventDefault();
    if (!leaveType || leaveDates.length === 0 || !reason) {
      toast.error("Please fill all fields");
      return;
    }

    Swal.fire({
      title: "Confirm Leave Application",
      text: "Are you sure you want to apply for leave?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, Apply Leave",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Processing...",
          text: "Applying for leave...",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          await axios.post(
            `${window.apiURL}/leaves/request`,
            {
              leaveType,
              leaveApplyDates: leaveDates.map((date) => date.toISOString().split("T")[0]),
              reason,
            },
            { 
              // withCredentials: true 
              headers:{
                Authorization:`${localStorage.getItem("token")}`
              }

            }
          );

          Swal.fire("Success!", "Your leave has been applied successfully.", "success");
          fetchLeaves();
          setLeaveType("");
          setLeaveDates([]);
          setReason("");
        } catch (error) {
          Swal.fire("Error!", "There was an issue applying for leave.", "error");
        }
      }
    });
  };

  // Handle Leave Cancellation
  const handleCancelLeave = async (leaveId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this leave request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, Cancel Leave",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Processing...",
          text: "Canceling your leave...",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          await axios.delete(`${window.apiURL}/leaves/${leaveId}/cancel`, 
            { 
              // withCredentials: true
              headers:{
                Authorization:`${localStorage.getItem("token")}`
              }
             }
          );

          // demo code
          Swal.fire("Success!", "Leave cancelled successfully.", "successs");
          fetchLeaves();
        } catch (error) {
          Swal.fire("Error!", "There was an issue canceling the leave.", "error");
        }
      }
    });
  };

  return (
    <div className="flex justify-center items-start gap-6 p-6 w-full">
      {/* Leave Request Form */}
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg border">
        <h2 className="text-xl font-semibold mb-4 text-center">Apply for Leave</h2>
        <form onSubmit={handleApplyLeave}>
          {/* Leave Type Selection */}
          <label className="block text-gray-700 mb-1">Select Leave Type:</label>
          <select className="w-full p-2 border rounded-md mb-3" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
            <option value="">-- Select Leave Type --</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Paid Leave">Paid Leave</option>
            <option value="Emergency Leave">Emergency Leave</option>
          </select>

          {/* Date Picker for Selecting Multiple Dates */}
          <label className="block text-gray-700 mb-1">Select Leave Dates:</label>
          <DatePicker selected={null} onChange={(date) => handleDateChange(date)} minDate={new Date()} inline />

          {/* Display Selected Dates */}
          {leaveDates.length > 0 && (
            <div className="mt-2 p-3 border rounded-md bg-gray-100">
              <h3 className="text-sm font-semibold mb-1">Selected Dates:</h3>
              <div className="flex flex-wrap gap-2">
                {leaveDates.map((date, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-200 rounded-md flex items-center">
                    {date.toISOString().split("T")[0]}
                    <button type="button" className="ml-2 text-red-600 font-bold" onClick={() => removeDate(date)}>
                      ❌
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reason Input */}
          <label className="block text-gray-700 mt-3 mb-1">Reason for Leave:</label>
          <textarea className="w-full p-2 border rounded-md" value={reason} onChange={(e) => setReason(e.target.value)} rows="3"></textarea>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-3 rounded-md hover:bg-blue-600">
            Apply for Leave
          </button>
        </form>
      </div>

      {/* Leave Records Table */}
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg border">
        <h2 className="text-xl font-semibold mb-4 text-center">Your Leave Requests</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead className="text-sm uppercase bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-center">Leave Type</th>
                <th className="border px-4 py-2 text-center">Dates</th>
                <th className="border px-4 py-2 text-center">Status</th>
                <th className="border px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id} className="border-b text-center">
                  <td className="border px-4 py-2">{leave.leaveType}</td>
                  <td className="border px-4 py-2">{leave.leaveApplyDates.join(", ")}</td>
                  <td className={`border px-4 py-2 ${leave.status === "Approved" ? "bg-green-500" : leave.status === "Rejected" ? "bg-red-500" : "bg-yellow-500"} text-white font-bold`}>
                    {leave.status}
                  </td>
                  <td className="border px-4 py-2">{leave.status === "Pending" && <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600" onClick={() => handleCancelLeave(leave._id)}>Cancel</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeaveSection;
