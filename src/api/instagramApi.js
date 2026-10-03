export const getInstagramAccounts = async () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await fetch("https://autodm-latest.onrender.com/api/instagram/accounts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Instagram accounts");
  }

  return await response.json();
};
