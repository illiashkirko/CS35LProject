import React from "react";
import './profile.css'

function Profile() {
  let username = "Username";
  let followerCount = "20";
  let followingCount = "25";
  let bio  = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum sem condimentum viverra pretium.";
  return(
    <>
    <br></br>
    <div>
      <header id="profheader">
      <table id="profdata">
        <tr>
          <td id = "profusercontainer" ><div id="divusername"><p id="profusername">{username}</p></div></td>
          <td>        
            <section id="profnums">
              <table id="fdata">
                <tr>
                  <td class="fdataitem"> Followers </td>
                  <td class="fdataitem"> Follwing </td>
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
 

export default Profile;