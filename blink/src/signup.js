import React from "react";
import './signup.css'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'

function Signup(){
    return (   
        <>
        <h2>Create a Blink account!</h2>
        <h4>Connect with the UCLA Blink Community</h4>
        <form class="loginform">
          <div class="logincontainer">
            <label for="uname" class="logintext"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname"></input>
            <label for="psw" class="logintext"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw"></input>
            <label for="rpsw" class="logintext"><b>Re-enter password</b></label>
            <input type="password" placeholder="Re-enter password" name="rpsw"></input>
            <label for="bio" class="logintext"><b>Bio</b></label>
            <input type="text" placeholder="Tell us about yourself" name="bio"></input>
            <button type="submit" class="logintext loginbutton">Sign Up</button>
          </div>
          <div class="logincontainer logincontainer2">
            <button type="button" class="logincancelbtn loginbutton">Cancel</button>
            <ul class="psw">
              <li class="loginli"><i><b>Have an account? </b></i><a id="link" href=''><u>SIGN IN</u></a></li>
            </ul>
          </div>
        </form>
        </>
        );
}
export default Signup;