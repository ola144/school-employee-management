import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockApi } from "../utils/mockApi";
import { useAuth } from "../context/AuthContext";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setEmployees(await mockApi.getEmployees());
      setLoading(false);
    })();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete employee?")) return;
    await mockApi.deleteEmployee(id);
    setEmployees(await mockApi.getEmployees());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Employees</h2>
        <div className="flex gap-2">
          {user.role === "admin" && (
            <button
              onClick={() => navigate("/employees/new")}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Employee ID</th>
              <th className="p-2 text-left">Department</th>
              <th className="p-2 text-left">Position</th>
              <th className="p-2 text-left">Contact</th>
              <th className="p-2 text-left">Start Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              employees.map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="p-2">{e.name}</td>
                  <td className="p-2">{e.employeeId}</td>
                  <td className="p-2">{e.department}</td>
                  <td className="p-2">{e.position}</td>
                  <td className="p-2">{e.contact}</td>
                  <td className="p-2">{e.startDate}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/employees/edit/${e.id}`)}
                        className="text-sm bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      {user.role === "admin" && (
                        <button
                          onClick={() => remove(e.id)}
                          className="text-sm bg-red-600 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
