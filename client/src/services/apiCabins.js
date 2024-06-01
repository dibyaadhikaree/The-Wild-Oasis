//frontend side so use export and export default

const API_URL = import.meta.env.VITE_API_URL;

const baseUrl = `${API_URL}/api/cabins/`;

export const getCabins = async function () {
  const res = await fetch(baseUrl);
  const data = await res.json();
  return data;
};

export const deleteCabin = async function ({ id }) {
  const res = await fetch(baseUrl + id, {
    method: "DELETE",
  });

  const data = await res.json();

  return data;
};

export const createEditCabin = async function (cabin) {
  const { id, image } = cabin;

  const res = await fetch(`${baseUrl}${id ? id : ""}`, {
    method: id ? "PATCH" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cabin), // body data type must match "Content-Type" header
  });

  const newCabin = await res.json();

  return newCabin;
};
