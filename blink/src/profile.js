import React from "react";
import ReactDOM from "react-dom/client";
import './profile.css'
import axios from "axios";

function Profile() {
  const backEndConnect = axios.create({
    baseURL: "http://localhost:5035",
  });
  
  let currentUsername = sessionStorage.getItem("current_user"); //retrieve globaly stored values
  let userName = sessionStorage.getItem("viewing_user");
  let followerCount = sessionStorage.getItem("follower_count");
  let followingCount = sessionStorage.getItem("following_count");
  let bio  = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum sem condimentum viverra pretium.";
  function follow()
  {
    /*var user;
    backEndConnect.get("/users/" + userName, userName)
    .then((res) => {
      user = "aaa";
      console.log(user);
    });
    console.log(user);
    const upduser = {
      userName: userName,
      following: user.following,
      followers: user.folllowers + 1,
      _id: user._id,
    };
    backEndConnect.post("/users/update/" + user._id, upduser);
    var curruser;
    backEndConnect.get("/users/" + currentUsername, currentUsername)
    .then((res) => {
      curruser = res.data[0];
    });
    const updcurruser = {
      userName: currentUsername,
      following: curruser.following + 1,
      followers: curruser.folllowers,
      _id: curruser._id,
    };
    backEndConnect.post("/users/update/" + user._id, updcurruser);*/
  }
  if(currentUsername === userName){
    return(
      <>
      <form id="profform" action="/">
        <input class="backHome" type="submit" value="Blink" />
      </form>
      <div>
        <header id="profheader">
        <table id="profdata">
          <tr>
            <td id = "profusercontainer" ><div id="divusername"><p id="profusername">{userName}</p></div></td>
            <td>        
              <section id="profnums">
                <table id="fdata">
                  <tr>
                    <td class="fdataitem"> Followers </td>
                    <td class="fdataitem"> Following </td>
                  </tr>
                  <tr>
                    <td class="fdataitem"> {followerCount} </td>
                    <td class="fdataitem"> {followingCount} </td>
                  </tr>
                </table>
              </section>
            </td>
          </tr>
          <tr>
            <td colspan="2" id="biodata"><div id="profbio">{bio}</div></td>
          </tr>
        </table>
        </header>
        <br></br>
        <hr></hr>
      </div>
      </>
    );
  }
  else{
    return(
      <>
      <form id="profform" action="/">
        <input class="backHome" type="submit" value="Blink" />
      </form>
      <div>
        <header id="profheader">
        <table id="profdata">
          <tr>
            <td id = "profusercontainer" >
              <div id="divusername">
                <table id="profuserfollow">
                  <tr>
                    <td><p id="profusername">{userName}</p></td>
                  </tr>
                  <tr>
                    <td id="proffbuttond"><button id="proffbutton" onClick={() => follow()}>Follow</button></td>
                  </tr>
                </table>
              </div>
            </td>
            <td>
              <section id="profnums">
                <table id="fdata">
                  <tr>
                    <td class="fdataitem"> Followers </td>
                    <td class="fdataitem"> Following </td>
                  </tr>
                  <tr>
                    <td class="fdataitem"> {followerCount} </td>
                    <td class="fdataitem"> {followingCount} </td>
                  </tr>
                </table>
              </section>
            </td>
          </tr>
          <tr>
            <td colspan="2" id="biodata"><div id="profbio">{bio}</div></td>
          </tr>
        </table>
        </header>
        <br></br>
        <hr></hr>
      </div>
      </>
    );
  }
 }
 

export default Profile;