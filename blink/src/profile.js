import React from "react";
import ReactDOM from "react-dom/client";
import './profile.css'
import axios from "axios";
import myRoute from "./global_variables";



function Profile() {
  const backEndConnect = axios.create({
    baseURL: "http://localhost:"+myRoute,
  });
  const root = ReactDOM.createRoot(document.getElementById("root"));

  let currentuserid = sessionStorage.getItem("current_user_id"); //retrieve globaly stored values
  let userid = sessionStorage.getItem("viewing_user_id");
  let bio  = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum sem condimentum viverra pretium.";
  
  class Bio extends React.Component {
    state = {
      userName: "", 
      curruserName: "",
      followerCount: 0,
      followingCount: 0,
      curruserfollowerCount: 0,
      curruserfollowingCount: 0,
      userpassword: "",
      curruserpassword: "",
    };

    follow()
    {
      const upduser = {
        userName: this.state.userName,
        following: this.state.followingCount,
        followers: this.state.followerCount + 1,
        password: this.state.userpassword,
        _id: userid,
      };
      backEndConnect.post("/users/update/" + userid, upduser);
      
      const updcurruser = {
        userName: this.state.curruserName,
        following: this.state.curruserfollowingCount + 1,
        followers: this.state.curruserfollowerCount,
        password: this.state.curruserpassword,
        _id: currentuserid,
      };
      backEndConnect.post("/users/update/" + currentuserid, updcurruser);
    }
    
    render() {
      currentuserid = sessionStorage.getItem("current_user_id");
      userid = sessionStorage.getItem("viewing_user_id");
      backEndConnect.get("/users/id/" + userid, userid)
      .then((res) => {
        this.setState({
          userName: res.data.userName,
          followerCount: res.data.followers,
          followingCount: res.data.following,
          userpassword: res.data.password,
        })
      });
      backEndConnect.get("/users/id/" + currentuserid, currentuserid)
      .then((res) => {
        this.setState({
          curruserName: res.data.userName,
          curruserfollowerCount: res.data.followers,
          curruserfollowingCount: res.data.following,
          curruserpassword: res.data.password,
        })
      });
      if (currentuserid === userid){
        return(
          <>
          <form id="profform" action="/">
            <input class="backHome" type="submit" value="Blink" />
          </form>
          <div>
            <header id="profheader">
            <table id="profdata">
              <tr>
                <td id = "profusercontainer" ><div id="divusername"><p id="profusername">{this.state.userName}</p></div></td>
                <td>        
                  <section id="profnums">
                    <table id="fdata">
                      <tr>
                        <td class="fdataitem"> Followers </td>
                        <td class="fdataitem"> Following </td>
                      </tr>
                      <tr>
                        <td class="fdataitem"> {this.state.followerCount} </td>
                        <td class="fdataitem"> {this.state.followingCount} </td>
                      </tr>
                    </table>
                  </section>
                </td>
              </tr>
              <tr>
                <td colSpan="2" id="biodata"><div id="profbio">{bio}</div></td>
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
                        <td><p id="profusername">{this.state.userName}</p></td>
                      </tr>
                      <tr>
                        <td id="proffbuttond"><button id="proffbutton" onClick={() => this.follow()}>Follow</button></td>
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
                        <td class="fdataitem"> {this.state.followerCount} </td>
                        <td class="fdataitem"> {this.state.followingCount} </td>
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
  }
  root.render(<Bio />);
}
 

export default Profile;