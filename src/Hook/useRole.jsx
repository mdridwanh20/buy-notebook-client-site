import { useEffect, useState } from "react";
import api from "./AxiosUrl";

export default function useRole(email) {
  const [isAdmin, setAdmin] = useState(false);
  const [isUser, setUser] = useState(false);

  useEffect(() => {
    if (!email) return;

    const fetchRole = async () => {
      try {
        const res = await api.get(`/users/${email}`);
        const role = res.data.role;
        setAdmin(role === "admin");
        setUser(role === "user");

      } catch (error) {
        console.log("this is error from use role ", error);
      }
    };

    fetchRole();
  }, [email]);


  return { isAdmin, isUser };
}
