const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const buildApiUrl = (path) => `${API_URL}${path}`;

export const apiFetch = async (path, options = {}) => {
  const token = localStorage.getItem("griderToken");

  const response = await fetch(buildApiUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const setStoredSession = (user, token) => {
  localStorage.setItem("griderUser", JSON.stringify(user));
  localStorage.setItem("griderToken", token);
};

export const getStoredUser = () => {
  const rawUser = localStorage.getItem("griderUser");
  return rawUser ? JSON.parse(rawUser) : null;
};

export const clearStoredSession = () => {
  localStorage.removeItem("griderUser");
  localStorage.removeItem("griderToken");
};

export default API_URL;
