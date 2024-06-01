const API_URL = import.meta.env.VITE_API_URL;

const baseUrl = `${API_URL}/api/users/`;

export const login = async function (credentials) {
  const res = await fetch(baseUrl + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!data.token) throw new Error("Invalid username or password");

  return data;
};

export const getCurrentUser = async function () {
  const session = localStorage.getItem("jwt");

  if (!session) throw new Error("Please Login");

  const res = await fetch(`${baseUrl}`, {
    method: "GET",
    headers: {
      authorization: "Bearer " + session,
    },
  });

  const data = await res.json();

  if (!data.user) throw new Error("Please Login");

  return data;
};

export const logout = async function () {
  const res = await fetch(baseUrl + "logout");

  const data = await res.json();

  if (data.status === "error") throw new Error("Failed Logging Out");

  return data;
};

export const signup = async function (user) {
  const session = localStorage.getItem("jwt");

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();

  if (data.status === "error") throw new Error("Failed Signing Up");

  return data;
};

export const updateUserData = async function (data) {
  const session = localStorage.getItem("jwt");

  const res = await fetch(baseUrl + "updateUserData", {
    method: "PATCH",

    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session}`,
    },
  });

  const updatedData = await res.json();

  if (updatedData.status === "error") throw new Error("Couldnt update");

  return updatedData;
};
export const updatePassword = async function (data) {
  const session = localStorage.getItem("jwt");

  const res = await fetch(baseUrl + "updatePassword", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session}`,
    },
    body: JSON.stringify(data),
  });

  const updatedPass = await res.json();

  if (updatedPass?.status === "error")
    throw new Error("Error Updating the Password");
  return updatedPass;
};
