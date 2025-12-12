import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockApi } from "../utils/mockApi";
import { useAuth } from "../context/AuthContext";

const LeaveForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    employeeId: "",
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "pending",
  });

  useEffect(() => {
    (async () => {
      const emps = await mockApi.getEmployees();
      if (!form.employeeId && emps[0])
        setForm((f) => ({ ...f, employeeId: emps[0].employeeId }));
      if (id) {
        const l = await mockApi.getLeave(id);
        if (l) setForm(l);
      }
    })();
  }, [form.employeeId, id]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.employeeId || !form.startDate || !form.endDate) {
      alert("Select employee and date range");
      return;
    }
    if (id) await mockApi.updateLeave(id, form);
    else await mockApi.createLeave({ ...form, id: "l" + Date.now() });
    navigate("/leaves");
  };

  return (
    <div className="max-w-lg bg-white p-6 rounded shadow">
      <h3 className="text-lg font-bold mb-4">{id ? "Edit" : "New"} Leave</h3>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          placeholder="Employee ID"
          className="border p-2 rounded"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select type</option>
          <option value="Annual">Annual</option>
          <option value="Sick">Sick</option>
          <option value="Unpaid">Unpaid</option>
        </select>
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          className="border p-2 rounded"
          placeholder="Reason"
        />
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/leaves")}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveForm;
