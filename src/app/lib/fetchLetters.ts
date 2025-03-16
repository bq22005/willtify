import axios from "axios";

export type Letter = {
  id: number;
  auther: { id: number; username: string; icon: string};
  content: string;
  notifyAt: string;
}

export const fetchMyLetters = async ()=> {
  const res = await fetch("api/letters");
  if (!res.ok) throw new Error("Failed to fetch letters");
  return res.json();
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