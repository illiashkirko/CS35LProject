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
  //let bio  = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum sem condimentum viverra pretium.";
  //increments like count or stores new comment
  function storeLikeOrComment(oldMessageData, comment = null) {
    var likeCount = oldMessageData.numberOfLikes;
    var commentList = oldMessageData.comments;
    if (comment) {
      commentList.push(comment);
    } else {
      likeCount++;
    }
    //creating new message
    const message = {
      user: oldMessageData.user,
      userMessages: oldMessageData.userMessages,
      numberOfLikes: likeCount,
      timeK: oldMessageData.timeK,
      comments: commentList,
      _id: oldMessageData._id,
    };
    backEndConnect.post("/messages/update/" + oldMessageData._id, message);
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
                  <input id="commentForm"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
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
                  <td id="username"><u><p>@{value.user}</p></u></td>
                  <td>{value.userMessages}</td>
                  <td id="votingData">
                    <button
                      id="like-button"
                      type="button"
                      onClick={() => storeLikeOrComment(value)}
                    >
                      {" "}
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
      userName: "", 
      curruserName: "",
      followerCount: 0,
      followingCount: 0,
      curruserfollowerCount: 0,
      curruserfollowingCount: 0,
      userpassword: "",
      curruserpassword: "",
      messages: [],
      bio: "",
      curruserbio: "",
    };

    follow()
    {
      const upduser = {
        userName: this.state.userName,
        following: this.state.followingCount,
        followers: this.state.followerCount + 1,
        password: this.state.userpassword,
        bio: this.state.bio,
        _id: userid,
      };
      backEndConnect.post("/users/update/" + userid, upduser);
      
      const updcurruser = {
        userName: this.state.curruserName,
        following: this.state.curruserfollowingCount + 1,
        followers: this.state.curruserfollowerCount,
        password: this.state.curruserpassword,
        bio: this.state.curruserbio,
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
          bio: res.data.bio,
        })
      });
      backEndConnect.get("/users/id/" + currentuserid, currentuserid)
      .then((res) => {
        this.setState({
          curruserName: res.data.userName,
          curruserfollowerCount: res.data.followers,
          curruserfollowingCount: res.data.following,
          curruserpassword: res.data.password,
          curruserbio: res.data.bio,
        })
      });
      backEndConnect.get("/messages/search/username/" + this.state.userName, this.state.userName)
      .then((res) => {
        this.setState({
          messages: res.data.slice(),
        })
      })
      console.log(this.state.messages);
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
                <td colSpan="2" id="biodata"><div id="profbio">{this.state.bio}</div></td>
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
                <td colspan="2" id="biodata"><div id="profbio">{this.state.bio}</div></td>
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