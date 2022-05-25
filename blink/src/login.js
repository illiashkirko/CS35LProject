import React from "react";
import './login.css'

function Login() {
  return (   
  <>
  <form class="loginform">
    <div class="logincontainer">
      <label for="uname" class="logintext"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname"></input>
  
      <label for="psw" class="logintext"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw"></input>
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