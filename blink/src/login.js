import React from "react";
import './login.css'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'


function Login() {
  const backEndConnect= axios.create({
    baseURL : 'http://localhost:5035'
  }) 

  const {register, handleSubmit} = useForm();

  let users=[];
  let password=[];

  backEndConnect.get('/users/').then(res => {
    { users = res.data.map( d => d.userName );}
  });
  backEndConnect.get('/users/').then(res => {
    { password = res.data.map( d => d.password );}
  })

  const onSubmit = (d) => {
    console.log(users);
    console.log(password);
    let found=false;
  for(let i=0; i< users.length; i=i+1){
    if(users[i] === d.UserName){
      if(password[i] === d.Password){
        alert("Succesful");
        found=true;
        window.location.href='/';
        break;
      }
    }
   
  }
  if(found===false){
  alert("Wrong Password!");
  }

};

  return (   
  <>
  <form class="loginform" onSubmit = {handleSubmit(onSubmit)}>
    <div class="logincontainer">
      <label for="uname" class="logintext"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname"{...register("UserName")}></input>
  
      <label for="psw" class="logintext"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw"{...register("Password")}></input>
      <button type="submit" class="logintext loginbutton">Login</button>
      <label class="logintext">
        <input type="checkbox" name="remember"></input>Remember me
      </label>
    </div>
    <div class="logincontainer logincontainer2">
      <button type="button" class="logincancelbtn loginbutton">Cancel</button>
      <ul class="psw">
        <li class="loginli"><i><b>Need an account? </b></i><a id="link" href=''><u>SIGN UP</u></a></li>
        <li class="loginli"><a id="link" href="./">Forgot password?</a></li>
      </ul>
    </div>
  </form>
  </>
  );
}

export default Login;