import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

/* ========= Upload & Analyze ========= */
export const uploadAndAnalyze = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_BASE}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* ========= Forecast ========= */
export const getForecast = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_BASE}/predict`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* ========= Auth ========= */
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/auth/login`, {
    email,
    password,
  });
  return res.data;
};

export const registerUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/auth/register`, {
    email,
    password,
  });
  return res.data;
};
