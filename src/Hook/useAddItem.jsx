import React, { useEffect, useState } from "react";
import api from "./AxiosUrl";

export default function useAddItem() {
  const [addItem, setAddItem] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api("/add-item");
        setAddItem(response.data);
      } catch (error) {
        console.log(error, "----> this is error from useUser");
      }
    }

    fetchUser();
  }, []);

  return { addItem, setAddItem };
}
