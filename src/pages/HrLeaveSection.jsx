import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const HrLeaveSection = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all employee leaves (HR Access)
  const fetchAllLeaves = async () => {
    setLoading(true);
    Swal.fire({
      title: "Loading...",
      text: "Fetching all employee leave requests...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.get(`${window.apiURL}/leaves/allEmployeeLeaves`, {
        // withCredentials: true,
        headers:{
          Authorization:`${localStorage.getItem("token")
          }`
        }
      });
      console.log(response);
      setLeaves(response.data);
    } catch (error) {
      toast.error("Failed to fetch leave requests");
    } finally {
      setLoading(false);
      Swal.close();
    }
  };

  useEffect(() => {
    fetchAllLeaves();
  }, []);

  // Handle Leave Approval or Rejection
  const handleLeaveStatusChange = async (leaveId, status) => {
    Swal.fire({
      title: `Confirm ${status} Leave?`,
      text: `Are you sure you want to ${status.toLowerCase()} this leave request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "Approved" ? "#28a745" : "#dc3545",
      confirmButtonText: `Yes, ${status}`,
      cancelButtonColor: "#6c757d",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Processing...",
          text: `Updating leave status to ${status}...`,
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          await axios.put(
            `${window.apiURL}/leaves/${leaveId}/status`,
            { status }, // Request body
            {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
                // withCredentials: true // Uncomment if backend requires authentication cookies
            }
        );
        

          Swal.fire("Success!", `Leave request ${status.toLowerCase()} successfully!`, "success");
          fetchAllLeaves();
        } catch (error) {
          Swal.fire("Error!", "Failed to update leave status.", "error");
        }
      }
    });
  };

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg border">
        <h2 className="text-2xl font-semibold mb-4 text-center">HR Leave Management</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading leave requests...</p>
        ) : (
          <table className="w-full text-sm border-collapse border border-gray-300">
            <thead className="text-sm uppercase bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-center">Employee</th>
                <th className="border px-4 py-2 text-center">Leave Type</th>
                <th className="border px-4 py-2 text-center">Dates</th>
                <th className="border px-4 py-2 text-center">Reason</th>
                <th className="border px-4 py-2 text-center">Status</th>
                <th className="border px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                leaves.map((leave) => (
                  <tr key={leave._id} className="border-b text-center">
                    <td className="border px-4 py-2 font-semibold">{leave.employee?.name}</td>
                    <td className="border px-4 py-2">{leave.leaveType}</td>
                    <td className="border px-4 py-2">{leave.leaveApplyDates.join(", ")}</td>
                    <td className="border px-4 py-2">{leave.reason}</td>
                    <td
                      className={`border px-4 py-2 font-bold ${
                        leave.status === "Approved"
                          ? "bg-green-500 text-white"
                          : leave.status === "Rejected"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {leave.status}
                    </td>
                    <td className="border px-4 py-2">
                      {leave.status === "Pending" ? (
                        <div className="flex justify-center gap-2">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                            onClick={() => handleLeaveStatusChange(leave._id, "Approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={() => handleLeaveStatusChange(leave._id, "Rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">No Actions</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HrLeaveSection;
