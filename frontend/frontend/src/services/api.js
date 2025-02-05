import axios from "axios";

const api = axios.create({
  baseURL: "https://job-platform-blue.vercel.app", // Ensure this URL is correct
});

// User-related API requests
export const getUsers = (token) =>
  api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const addUser = (data, token) =>
  api.post("/users", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const deleteUser = (id, token) =>
  api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getUser = (id, token) =>
  api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const editUser = (id, data, token) =>
  api.patch(`/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const loginUser = (data) => api.post("/login", data);

// Tuition-related API requests
export const getTuitions = () => api.get("/tuitions");
export const addTuition = (data, token) =>
  api.post("/tuitions", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const deleteTuition = (id, token) =>
  api.delete(`/tuitions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getTuition = (id) => api.get(`/tuitions/${id}`);
export const editTuition = (id, data, token) =>
  api.patch(`/tuitions/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const applyToTuition = (id, token) =>
  api.post(
    `/tuitions/${id}/apply`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const registerUser = (data) => api.post("/users", data);
