// mockApi: simple JSON storage using localStorage. Provides CRUD for employees and leaves.

const EMP_KEY = "se_employees_v1";
const LEAVE_KEY = "se_leaves_v1";

function ensureSeed() {
  if (!localStorage.getItem(EMP_KEY)) {
    const seed = [
      {
        id: "e1",
        name: "John Doe",
        employeeId: "EMP001",
        department: "Math",
        position: "Teacher",
        contact: "john@school.edu",
        startDate: "2020-08-01",
      },
      {
        id: "e2",
        name: "Jane Smith",
        employeeId: "EMP002",
        department: "Science",
        position: "Lab Assistant",
        contact: "jane@school.edu",
        startDate: "2019-09-15",
      },
    ];
    localStorage.setItem(EMP_KEY, JSON.stringify(seed));
  }
  if (!localStorage.getItem(LEAVE_KEY)) {
    const seed = [
      {
        id: "l1",
        employeeId: "EMP001",
        type: "Annual",
        startDate: "2025-12-15",
        endDate: "2025-12-20",
        reason: "Family holiday",
        status: "pending",
      },
    ];
    localStorage.setItem(LEAVE_KEY, JSON.stringify(seed));
  }
}

function read(key) {
  ensureSeed();
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function write(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const mockApi = {
  // Employees
  getEmployees: async () => {
    await sleep(200);
    return read(EMP_KEY);
  },

  getEmployee: async (id) => {
    await sleep(100);
    return read(EMP_KEY).find((e) => e.id === id);
  },

  createEmployee: async (emp) => {
    const data = read(EMP_KEY);
    data.push(emp);
    write(EMP_KEY, data);
    return emp;
  },

  updateEmployee: async (id, updates) => {
    const data = read(EMP_KEY).map((e) =>
      e.id === id ? { ...e, ...updates } : e
    );
    write(EMP_KEY, data);
    return data.find((e) => e.id === id);
  },

  deleteEmployee: async (id) => {
    const data = read(EMP_KEY).filter((e) => e.id !== id);
    write(EMP_KEY, data);
    return true;
  },

  // Leaves
  getLeaves: async () => {
    await sleep(200);
    return read(LEAVE_KEY);
  },

  getLeave: async (id) => {
    await sleep(100);
    return read(LEAVE_KEY).find((l) => l.id === id);
  },

  createLeave: async (leave) => {
    const data = read(LEAVE_KEY);
    data.push(leave);
    write(LEAVE_KEY, data);
    return leave;
  },

  updateLeave: async (id, updates) => {
    const data = read(LEAVE_KEY).map((l) =>
      l.id === id ? { ...l, ...updates } : l
    );
    write(LEAVE_KEY, data);
    return data.find((l) => l.id === id);
  },

  deleteLeave: async (id) => {
    const data = read(LEAVE_KEY).filter((l) => l.id !== id);
    write(LEAVE_KEY, data);
    return true;
  },
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
