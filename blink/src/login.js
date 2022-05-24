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
    <div class="logincontainer">
      <button type="button" class="logincancelbtn loginbutton">Cancel</button>
      <span class="psw">Forgot <a id="link" href="./">password?</a></span>
    </div>
  </form>
  </>
  );
}

export default Login;