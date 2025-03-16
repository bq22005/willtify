import axios from "axios";

export type Letter = {
  id: number;
  auther: { id: number; username: string; icon: string};
  content: string;
  notifyAt: string;
}

export const fetchMyLetters = async () => {
  try {
    const response = await axios.get("api/letters");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch my letters");
  }
};

export const fetchOtherLetters = async () => {
  try {
    const response = await axios.get("api/recommends");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch other letters");
  }
};

export const postLetter = async (autherId: number, content: string, notifyAt: Date) => {
  try {
    const response = await axios.post("/api/letters", {
      autherId,
      content,
      notifyAt,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to post letter", error);
    return null;
  }
};