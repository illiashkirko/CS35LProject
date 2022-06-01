import React from "react";
import './login.css'
import { useForm } from "react-hook-form";
import axios from 'axios'
import {portNumberSrc} from './portNumber'
function Login() {
  const backEndConnect= axios.create({
    baseURL : 'http://localhost:'+portNumberSrc
  }) 

  const {register, handleSubmit} = useForm();

  const onSubmit = (d) => {

    backEndConnect.get("/users/" + d.UserName, d.UserName)
    .then((res) => {
      if (res.data.length === 0) {
        alert("Username is not registered!");
      } else if (res.data[0].password === d.Password) {
          sessionStorage.setItem("current_user_id", res.data[0]._id);
          sessionStorage.setItem("current_user", d.UserName);
          alert("Success!");
          window.location.href = '/home'; //go to mainpage
      }
      else {
        alert("Wrong password!");
      }
    });
};

  return (   
  <>
  <h2>Login to your Blink account</h2>
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
      <button type="button" class="logincancelbtn loginbutton" onClick={() => {window.location.href='/';}}>Cancel</button>
      <ul class="psw">
        <li class="loginli"><i><b>Need an account? </b></i><a id="linksignup" href='/signup'><u>SIGN UP</u></a></li>
      </ul>
    </div>
  </form>
  </>
  );
}

export default Login;