import { collection, getDocs } from "firebase/firestore";

import { db } from "@/lib/firebase";

export const getUsers = async () => {
  const ss = await getDocs(collection(db, "users"));
  return ss.docs.map((doc) => doc.data() as User);
};

export const getActivities = async () => {
  const ss = await getDocs(collection(db, "activities"));
  return ss.docs.map((doc) => doc.data() as Activity);
};
