import React, { useEffect, useState } from "react";
import { mockApi } from "../utils/mockApi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    (async () => {
      setEmployees(await mockApi.getEmployees());
      setLeaves(await mockApi.getLeaves());
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Employees</div>
          <div className="text-3xl font-bold">{employees.length}</div>
          <Link to="/employees" className="text-sm text-blue-600">
            Manage
          </Link>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Leave Requests</div>
          <div className="text-3xl font-bold">{leaves.length}</div>
          <Link to="/leaves" className="text-sm text-blue-600">
            Manage
          </Link>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-3xl font-bold">
            {leaves.filter((l) => l.status === "pending").length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
