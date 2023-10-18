import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "@/lib/firebase";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const ss = await getDocs(collection(db, "users"));
      setUsers(ss.docs.map((doc) => doc.data() as User));
    };

    getUsers();
  }, []);

  return users;
};
