import React from "react";
import './signup.css'
import { useForm } from "react-hook-form";
import axios from 'axios'

function Signup(){
  const backEndConnect= axios.create({
    baseURL : 'http://localhost:5056'
  }) 

  const {register, handleSubmit} = useForm();

  const onSubmit = (d) => {
    //create new user
    const user = {
      userName: d.UserName,
      followers: [],
      following: [],
      password: d.Password,
      bio: d.Bio,
    };
    console.log(user.bio);
    backEndConnect.get("/users/" + d.UserName, d.UserName)
    .then((res) => {
      if (res.data.length > 0) {
        alert("Username is already registered!");
      } else {
        //add user to the database
        backEndConnect
        .post("/users/add", user)
        .then((res) => console.log(res.data));
        alert("Success!");
        //go to login page
        window.location.href="/";
      }
    });
    
  };
    return (   
        <>
        <h2>Create a Blink account!</h2>
        <h4>Connect with the UCLA Blink Community</h4>
        <form class="loginform" onSubmit= {handleSubmit(onSubmit)}>
          <div class="logincontainer">
            <label for="uname" class="logintext"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname"{...register("UserName")}></input>
            <label for="psw" class="logintext"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw"{...register("Password")}></input>
            <label for="rpsw" class="logintext"><b>Re-enter password</b></label>
            <input type="password" placeholder="Re-enter password" name="rpsw"></input>
            <label for="bio" class="logintext"><b>Bio and interests</b></label>
            <input type="text" placeholder="Tell us about yourself" name="bio"{...register("Bio")}></input>
            <button type="submit" class="logintext loginbutton">Sign Up</button>
          </div>
          <div class="logincontainer logincontainer2">
            <button type="button" class="logincancelbtn loginbutton" onClick={() => {window.location.href='/signup';}}>Cancel</button>
            <ul class="psw">
              <li class="loginli"><i><b>Have an account? </b></i><a id="linksignup" href='/'><u>LOG IN</u></a></li>
            </ul>
          </div>
        </form>
        </>
        );
}
export default Signup;