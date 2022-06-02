import React from "react";
import ReactDOM from "react-dom/client";
import './profile.css'
import axios from "axios";
import $ from 'jquery';
import {portNumberSrc} from './portNumber'
import {imageLinks} from './imageLinks'


function Profile() {
  const backEndConnect= axios.create({
    baseURL : 'http://localhost:'+portNumberSrc
  }) 
  const root = ReactDOM.createRoot(document.getElementById("root"));

  let currentuserid = sessionStorage.getItem("current_user_id"); //retrieve globaly stored values
  let userid = sessionStorage.getItem("viewing_user_id");
  //let bio  = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum sem condimentum viverra pretium.";
  //increments like count or stores new comment
  function storeLikeOrComment(oldMessageData, comment = null) {
    var likeCount = oldMessageData.numberOfLikes;
    var commentList = oldMessageData.comments;
    var likeppl = oldMessageData.likeppl;
    if (comment) {
      commentList.push(comment);
    } else {
      if (!likeppl.includes(sessionStorage.getItem("current_user"))) {
        likeppl.push(sessionStorage.getItem("current_user"));
        likeCount++;
      }
      else {
        likeppl.splice(likeppl.indexOf(sessionStorage.getItem("current_user")), 1);
        likeCount--;
      }
    }
    //creating new message
    const message = {
      user: oldMessageData.user,
      userMessages: oldMessageData.userMessages,
      numberOfLikes: likeCount,
      timeK: oldMessageData.timeK,
      comments: commentList,
      likeppl: likeppl,
      _id: oldMessageData._id,
    };
    backEndConnect.post("/messages/update/" + oldMessageData._id, message);
  }
  //table of comments (each message has one)
  const displayData = new Map();

  function setdisplayData(message_id)
  {
    if(!displayData.get(message_id))
      displayData.set(message_id,true);
    else
      displayData.set(message_id,false);
  }

  function hideOrShow(message_id)
  {
      if (displayData.get(message_id))
        return 'block';
      else
        return 'none';
  }
  
  //changing to profile page
  function goToProfile(userName) {
    backEndConnect.get("/users/" + userName, userName)
    .then((res) => {
      sessionStorage.setItem("viewing_user", res.data[0].userName); //stores userinformation in global scope before going to their page
      sessionStorage.setItem("viewing_user_id", res.data[0]._id);
      window.location.href = '/profile/'+userName;
    });
    
  }
  //table of comments (each message has one)
  class CommentTable extends React.Component {
    state = {
      value: "", // value of current message in text box
    };

    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
      storeLikeOrComment(this.props.messageData, this.state.value); //send new comment to DB
      this.setState({
        value: "",
      }); //clear value in text box
      event.preventDefault();
    }

    render() {
      return (
        <table ref="myTable">
          <tbody>
            <tr>
              <td onSubmit={this.handleSubmit}>
                <form onSubmit={this.handleSubmit}>
                  <input class="commentForm" id = {this.props.messageData._id}  
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={{display:hideOrShow(this.props.messageData._id)}}
                  />
                </form>
              </td>
            </tr>
            {this.props.messageData.comments.map((comments) => (
              <tr>
                <td>{comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
  
  const Table = ({ value }) => {
    return (
      <>
        <table id="messageTable">
          <tbody>
            {value.map((value) => (
              <>
                <tr key={value._id}>
                  <td id="username"><b><p onClick={() => goToProfile(value.user)}>@{value.user}</p></b></td></tr>
                <tr id="tweetrow"><td>{value.userMessages}</td>
                  <td id="commentbutton">
                  <button
                    type="button"
                    id="button-comment"
                    onClick={() => setdisplayData(value._id)}>
                    <img id="comment-icon"
                    alt="comment button"
                    src={require("./commenticon.png")}
                    width="20em"
                    ></img>
                    </button>
                  </td>
                  <td id="votingData">
                    <button
                      id="like-button"
                      type="button"
                      onClick={() => storeLikeOrComment(value)}
                    >
                      <img
                        id="like-icon"
                        alt="like button"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/1024px-Facebook_Like_button.svg.png"
                        width="20em"
                      />
                    </button>
                  </td>
                  <td>{value.numberOfLikes}</td>
                </tr>
                {/* this row contains the table of comments */}
                <tr key="commentsRow">
                  <td>
                    {" "}
                    <CommentTable messageData={value} />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  class Bio extends React.Component {
    state = {
      messages: [],
      iffollowing: "Follow", //can be Follow or Unfollow
      constuctorcalled: false,
      user: {_id: "", userName: "", following: [], followers: [], bio: ""},
      curruser: {_id: "", userName: "", following: [], followers: [], bio: ""},
      imageLinkNumber:"",
    };

    customconstr() {
      if (!this.state.constuctorcalled && this.state.user.userName !== "" && this.state.curruser.userName !== "")
      {
        if (this.state.user.followers.includes(this.state.curruser.userName)) {
          this.setState({ iffollowing: "Unfollow" });
        }
        else {
          this.setState({ iffollowing: "Follow"});
        }
        this.setState({
          constuctorcalled: true,
        })
      }
    }
    follow()
    {
      let user = this.state.user;
      let curruser = this.state.curruser;
      if (this.state.iffollowing === "Follow")
      {
        this.setState({ iffollowing: "Unfollow", });
        user.followers.push(curruser.userName);
        curruser.following.push(user.userName);        
        backEndConnect.post("/users/update/" + this.state.user._id, user);
        backEndConnect.post("/users/update/" + curruser._id, curruser);
      }
      else 
      {
        this.setState({ iffollowing: "Follow", });
        user.followers.splice(user.followers.indexOf(curruser.userName), 1);
        curruser.following.splice(curruser.following.indexOf(user.userName), 1);
        backEndConnect.post("/users/update/" + user._id, user);
        backEndConnect.post("/users/update/" + curruser._id, curruser);
      }
    }
    render() {
      currentuserid = sessionStorage.getItem("current_user_id");
      let userid = sessionStorage.getItem("viewing_user_id");
      backEndConnect.get("/users/id/" + userid, userid)
      .then((res) => {
        this.setState({ user: res.data, 
          imageLinkNumber:res.data.imageNumber,})
      });
      backEndConnect.get("/users/id/" + currentuserid, currentuserid)
      .then((res) => {
        this.setState({ 
          curruser: res.data, 
          
        })
      });
      backEndConnect.get("/messages/search/username/" + this.state.user.userName, this.state.user.userName)
      .then((res) => {
        this.setState({
          messages: res.data.slice(),
        })
      })
      this.customconstr();
      if (currentuserid === userid){
        
        return(
          <>
           <img id="imgProfile2nd" src={imageLinks[this.state.imageLinkNumber]} alt="pfp"></img>

          <form id="profform" action="/home">
            <input class="backHome" type="submit" value="Blink"/>
            
          </form>
          <div>
            <header id="profheader">
            <table id="profdata">
              <tr>
                <td id = "profusercontainer" >
                  <div id="divusername">
                    <p id="profusername">{this.state.user.userName}</p>
                  </div>
                </td>
                <td>        
                  <section id="profnums">
                    <table id="fdata">
                      <tr>
                      <td>
                        <div class="dropdown">
                          <button class="dropbtn" id="followers">Followers</button>
                          <div class="dropdown-content" id="dropdownfollowers">
                            {this.state.user.followers.map((follower) => <a onClick={() => goToProfile(follower)}>{follower}</a>)}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="dropdown">
                          <button class="dropbtn" id="followers">Following</button>
                          <div class="dropdown-content" id="dropdownfollowers">
                            {this.state.user.following.map((follower) => <a onClick={() => goToProfile(follower)}>{follower}</a>)}
                          </div>
                        </div>
                      </td>
                      </tr>
                      <tr>
                        <td class="fdataitem"> {this.state.user.followers.length} </td>
                        <td class="fdataitem"> {this.state.user.following.length} </td>
                      </tr>
                    </table>
                  </section>
                </td>
              </tr>
              <tr>
                <td colSpan="2" id="biodata"><div id="profbio">{this.state.user.bio}</div></td>
              </tr>
            </table>
            </header>
            <br></br>
            <hr></hr>
            
          </div>
          <Table value={this.state.messages} />
          </>
        );
      }
      else{
        return(
          <>
          <img id="imgProfile2nd" src={imageLinks[this.state.imageLinkNumber]} alt="pfp"></img>
          <form id="profform" action="/home">
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
                        <td><p id="profusername">{this.state.user.userName}</p></td>
                      </tr>
                      <tr>
                        <td id="proffbuttond"><button id="proffbutton" onClick={() => this.follow()}> {this.state.iffollowing}</button> </td>
                      </tr>
                    </table>
                  </div>
                </td>
                <td>
                  <section id="profnums">
                    <table id="fdata">
                      <tr>
                      <td>
                        <div class="dropdown">
                          <button class="dropbtn" id="followers">Followers</button>
                          <div class="dropdown-content" id="dropdownfollowers">
                            {this.state.user.followers.map((follower) => <a onClick={() => goToProfile(follower)}>{follower}</a>)}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="dropdown">
                          <button class="dropbtn" id="followers">Following</button>
                          <div class="dropdown-content" id="dropdownfollowers">
                            {this.state.user.following.map((follower) => <a onClick={() => goToProfile(follower)}>{follower}</a>)}
                          </div>
                        </div>
                      </td>
                      </tr>
                      <tr>
                        <td class="fdataitem"> {this.state.user.followers.length} </td>
                        <td class="fdataitem"> {this.state.user.following.length} </td>
                      </tr>
                    </table>
                  </section>
                </td>
              </tr>
              <tr>
                <td colspan="2" id="biodata"><div id="profbio">{this.state.user.bio}</div></td>
              </tr>
            </table>
            </header>
            <br></br>
            <hr></hr>
          </div>
          <Table value={this.state.messages} />
          </>
        );
      }
   }
  }
  root.render(<Bio />);
}
 

export default Profile;