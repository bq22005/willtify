import axios from "axios";

export const fetchUser = async (param: string) => {
  try {
    const response = await axios.get(`/api/user/${param}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};