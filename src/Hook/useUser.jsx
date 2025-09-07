import React, { useEffect, useState } from "react";
import api from "./AxiosUrl";

export default function useUser() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api("/users");
        setUserData(response.data);
      } catch (error) {
        console.log(error, "----> this is error from useUser");
      }
    }

    fetchUser();
 

  }, []);

  return { userData, setUserData };
  
}
