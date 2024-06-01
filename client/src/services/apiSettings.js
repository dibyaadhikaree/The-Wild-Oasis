const API_URL = import.meta.env.VITE_API_URL;

const baseUrl = `${API_URL}/api/settings/`;

export async function getSettings() {
  const res = await fetch(baseUrl);

  const data = await res.json();

  return data;
}

export async function updateSetting(newSetting) {
  const res = await fetch(baseUrl + "663b8133d8d619d48957af14", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSetting),
  });

  const data = await res.json();

  return data;
}
