import axios from "axios";

export const getUsersLinks = async (userId) => {
  const res = await axios.get(`/api/url?userId=${userId}`);
  console.log("api", res.data);
  if (!res.ok) {
    throw new Error("Failed to get users links.");
  }
  return res.data;
};
