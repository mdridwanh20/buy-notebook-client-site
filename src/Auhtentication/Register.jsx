import React, { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Register_Form from "./Register_Form";
import { MyContext } from "../AuthProver/AuthProver";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";
import api from "../Hook/AxiosUrl";
import { updateProfile } from "firebase/auth";

export default function Register() {
  const { user, setUser, loading, createNewUser } = useContext(MyContext);
  const navigate = useNavigate();

  const handlerRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });

    // create new user
    createNewUser(email, password)
      .then((result) => {
        console.log("new user created", result.user);


        // update the profile by firebase
        updateProfile(result.user, {
          displayName: name,
          photoURL: result.user.photoURL || "Not Available"
        }).then(() => {
          console.log('Profile updated successfully');
        })


        // prepare user data to send to mongodb 
        const userData ={
          name: name || "Not Available",
          email: email,
          photoURL: result.user.photoURL || "Not Available",
          createAt: new Date().toLocaleDateString("en-GB").slice(0, 8),
          role: 'user'
        }


        
        // send to data on mongodb
        api
          .post("/users", userData)
          .then((res) => {
            console.log("user saved to mongodb", res.data);
            toast.success("register is success");
            form.reset();
            navigate("/");
          })
          .catch((err) => {
            console.error("MongoDB error:", err.message);
          });


      })


      .catch((error) => {
        toast.error("Error register. please try again");
        console.log(error.message);
      });


      
  };

  return <Register_Form handlerRegister={handlerRegister}></Register_Form>;
}
