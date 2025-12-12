import React, { useEffect, useState } from "react";
import { mockApi } from "../utils/mockApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLeaves(await mockApi.getLeaves());
      setEmployees(await mockApi.getEmployees());
    })();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete leave?")) return;
    await mockApi.deleteLeave(id);
    setLeaves(await mockApi.getLeaves());
  };

  const changeStatus = async (id, status) => {
    await mockApi.updateLeave(id, { status });
    setLeaves(await mockApi.getLeaves());
  };

  const lookupName = (empId) =>
    employees.find((e) => e.employeeId === empId)?.name || empId;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Leave Requests</h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/leaves/new")}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            New Leave
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Employee</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Start</th>
              <th className="p-2 text-left">End</th>
              <th className="p-2 text-left">Reason</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="p-2">{lookupName(l.employeeId)}</td>
                <td className="p-2">{l.type}</td>
                <td className="p-2">{l.startDate}</td>
                <td className="p-2">{l.endDate}</td>
                <td className="p-2">{l.reason}</td>
                <td className="p-2">{l.status}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    {user.role !== "employee" && (
                      <button
                        onClick={() => changeStatus(l.id, "approved")}
                        className="text-sm bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}
                    {user.role !== "employee" && (
                      <button
                        onClick={() => changeStatus(l.id, "rejected")}
                        className="text-sm bg-yellow-600 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/leaves/edit/${l.id}`)}
                      className="text-sm bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    {l.status === "pending" && user.role === "employee" && (
                      <button
                        onClick={() => remove(l.id)}
                        className="text-sm bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveList;
