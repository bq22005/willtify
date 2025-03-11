import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type MyLetter = {
  id: number;
  letterid: number;
  username: string;
  icon: string;
  date: string;
  text: string;
}

export const fetchMyLetters = async () => {
  try {
    const response = await axios.get(`${API_URL}/myletters`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my letters.", error);
    return [];
  }
}