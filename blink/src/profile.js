import React from "react";
import './profile.css'

function Profile() {

  let currentUsername = "currentu"
  let username = "username";
  let followerCount = 20;
  let followingCount = 25;
  let bio  = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum sem condimentum viverra pretium.";
  if(currentUsername === username){
    return(
      <>
      <form id="profform" action="/">
        <input class="backHome" type="submit" value="Blink" />
      </form>
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
                    <td class="fdataitem"> Following </td>
                  </tr>
                  <tr>
                    <td class="fdataitem"> {this.followerCount} </td>
                    <td class="fdataitem"> {this.followingCount} </td>
                  </tr>
                </table>
              </section>
            </td>
          </tr>
          <tr>
            <td colspan="2" id="biodata"><div id="profbio">{this.bio}</div></td>
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
                    <td><p id="profusername">{username}</p></td>
                  </tr>
                  <tr>
                    <td id="proffbuttond"><button id="proffbutton">Follow</button></td>
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