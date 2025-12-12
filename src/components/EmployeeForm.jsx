import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockApi } from "../utils/mockApi";
import { v4 as uuidv4 } from "uuid";

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    department: "",
    position: "",
    contact: "",
    startDate: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      (async () => {
        const e = await mockApi.getEmployee(id);
        if (e) setForm(e);
      })();
    }
  }, [id]);

  const validate = () => {
    if (!form.name || !form.employeeId) return "Name and Employee ID required";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    if (id) {
      await mockApi.updateEmployee(id, form);
    } else {
      await mockApi.createEmployee({ ...form, id: "e" + Date.now() });
    }
    navigate("/employees");
  };

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow">
      <h3 className="text-lg font-bold mb-4">{id ? "Edit" : "New"} Employee</h3>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="border p-2 rounded"
        />
        <input
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          placeholder="Employee ID"
          className="border p-2 rounded"
        />
        <input
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          placeholder="Department"
          className="border p-2 rounded"
        />
        <input
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          placeholder="Position"
          className="border p-2 rounded"
        />
        <input
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          placeholder="Contact"
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="border p-2 rounded"
        />
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
