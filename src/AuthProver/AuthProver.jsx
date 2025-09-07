import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../Firebase/Firebase.config";

export const MyContext = createContext(null);


export default function AuthProver({ children }) {
  const [user, setUser] = useState(null);

  // console.log(user);

  const [loading, setLoading] = useState(false);

  // create new user by firebase
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // log out
  const logOut = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createNewUser,
    loginUser,
    logOut,
  };


  // ✅ listen for auth state changes (important!)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current User -----> ", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();

  }, []);


  return <MyContext.Provider value={authInfo}>{children}</MyContext.Provider>;
  
}
