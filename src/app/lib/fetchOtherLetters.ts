import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type OtherLetter = {
  id: number;
  username: string;
  icon: string;
  date: string;
  text: string;
}

export const fetchOtherLetters = async () => {
  try {
    const response = await axios.get(`${API_URL}/otherletters`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch other letters.");
    return [];
  }
}