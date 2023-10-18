import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "@/lib/firebase";

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const getActivities = async () => {
      const ss = await getDocs(collection(db, "activities"));
      setActivities(ss.docs.map((doc) => doc.data() as User));
    };

    getActivities();
  }, []);

  return activities;
};
