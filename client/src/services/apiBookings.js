const API_URL = import.meta.env.VITE_API_URL;

const baseUrl = `${API_URL}/api/bookings/`;

export const getBookings = async function (queryUrl) {
  const res = await fetch(baseUrl + queryUrl);
  const data = await res.json();

  return data;
};

export const getBooking = async function (id) {
  const res = await fetch(baseUrl + `/${id}`);
  const data = await res.json();
  return data;
};

export const createBooking = async function ({ booking }) {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });

  const data = await res.json();

  return data;
};

export const updateBooking = async function (id, updateDoc) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateDoc),
  });

  const data = res.json();
  return data;
};

export const deleteBooking = async function (id) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  const data = res.json();
  return data;
};
