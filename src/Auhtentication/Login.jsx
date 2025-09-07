import React, { useContext } from 'react'
import Login_Form from './Login_Form';
import { MyContext } from '../AuthProver/AuthProver';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function Login() {

  const {user, setUser, loginUser} = useContext(MyContext)
  const navigate = useNavigate()

  const handlerLogin =(e) => {
    
    e.preventDefault()
    
    const form = e.target;
    const email = form.email.value
    const password = form.password.value
    
    console.log({email, password});

    loginUser(email, password)
    .then((result) => {
      toast.success('Welcome back')
      console.log('successful login', result.user);
      navigate('/')
      
    }) .catch((error) => {
      toast.error('Error login')
      console.log(error);
      
    })
    

    
  }

  return (
    <Login_Form handlerLogin={handlerLogin}></Login_Form>
  )
}
