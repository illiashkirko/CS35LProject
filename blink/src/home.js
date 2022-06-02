import React from "react";
import ReactDOM from "react-dom/client";
import "./home.css";
import axios from "axios";
import $ from 'jquery';
import {portNumberSrc} from './portNumber'
import {imageLinks} from './imageLinks'

function Home() {
  const backEndConnect= axios.create({
    baseURL : 'http://localhost:'+portNumberSrc
  }) 
  const root = ReactDOM.createRoot(document.getElementById("root"));

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
  function getImageNumber(userID){
    let curruser= {_id: "", userName: "", following: [], followers: [], bio: "", imageNumber:0};
    if(!userID){


    }
    else{
    backEndConnect.get("/users/id/" + userID, userID)
    .then((res) => {
      console.log(res.data)
      curruser=res.data
        
      
    })
  }
    return curruser.imageNumber

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
                    src="commenticon.png"
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

  class InputBox extends React.Component {
    state = {
      value: "", // value of current message in text box
      textValue: [],
      displayoption: 1,
      search: "", // value to search
      currSearching: true, // indicates that the user can input search queries, false - if user submitted a query
      imageLinkNumber:'',
    };

    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this); // handleChange handles when the textbox changes
      this.handleSubmit = this.handleSubmit.bind(this); // handles when you click the submit button
      this.handleSearchChange = this.handleSearchChange.bind(this);
      this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ value: event.target.value }); // update current value
    }

    handleSubmit(event) {
      //backend
      const message = {
        user: sessionStorage.getItem("current_user"),
        userMessages: this.state.value,
        numberOfLikes: 0,
        timeK: Date.now(),
        comments: [],
      };
      backEndConnect
        .post("/messages/add", message)
        .then((res) => console.log(res.data));

      this.setState({
        value: "", // sets the textbox as empty
      });

      document.getElementById("tweetInput").value = ""; // sets the textbox to empty
      event.preventDefault();
    }

    handleSearchChange(event) {
      this.setState({
        search: event.target.value, // update current search value
        currSearching: true, // indicate that we started searching
      });
    }

    handleSearchSubmit(event) {
      this.setState({
        currSearching: false, // indicate that we stopped inputting searching
      });

      document.getElementById("searchInput").value = ""; // sets the textbox to empty
      event.preventDefault();
    }
    //change state based on sorting
    sortByLikes() {
      console.log("likesort");
      this.setState({
        displayoption: 2,
      });
    }
    sortByTime() {
      console.log("timesort");
      this.setState({
        displayoption: 1,
      });
    }
    following() {
      console.log("display only following");
      this.setState({
        displayoption: 3,
      })
    }
    updateMessages() {
      if (this.state.search !== "" && this.state.currSearching === false) {
        backEndConnect
          .get("/messages/search/" + this.state.search, this.state.search)
          .then((res) => {
            this.setState({
              textValue: res.data.slice(), //instead of having an array with ambigous indecies, let's have a copy of the resulting dictionary
            });
          });
      } else if (this.state.displayoption === 1) {
        backEndConnect.get("/messages/").then((res) => {
          this.setState({
            textValue: res.data.slice()
          });
        });
      } else if (this.state.displayoption === 2) {
        backEndConnect.get("/messages/sortedbylikes").then((res) => {
          this.setState({
            textValue: res.data.slice(), 
          });
        });
      } else {
        let following = [];
        let currentuserid = sessionStorage.getItem("current_user_id");
        backEndConnect.get("/users/id/" + currentuserid, currentuserid)
        .then((res) => {
          following = res.data.following.slice();
            backEndConnect.get("/messages/").then((res) => {
                this.setState({
                  textValue: res.data.filter(x => following.includes(x.user) ),
                });}
           );
          });
      }
    }

    render() {

      //backEndConnect.delete('/messages/'); // deletes all messages
      //backEndConnect.delete('/users/'); // deletes all users
      this.updateMessages();
      let currentuserid = sessionStorage.getItem("current_user_id");
      backEndConnect.get("/users/id/"+ currentuserid, currentuserid).then((res) => {
        this.setState({
          imageLinkNumber:res.data.imageNumber,
        })
      });
      return (
        <>
        <div class="dropdown">
        <img  src={imageLinks[this.state.imageLinkNumber]} id="imgProfile" ></img>
          <button class="dropbtn"><p id = "intro">{sessionStorage.getItem("current_user")}</p></button>
          <div class="dropdown-content">
            <a onClick={() => goToProfile(sessionStorage.getItem("current_user"))}>My Profile</a>
            <a href='/' onClick={()=> {sessionStorage.removeItem("current_user"); 
            sessionStorage.removeItem("current_user_id");}}>LOG OUT</a>
          </div>
        </div>

          <form onSubmit={this.handleSearchSubmit} id="inputForm">
            <label>
              <input
                id="searchInput"
                placeholder="What do you want to look up?"
                type="text"
                value={this.state.search}
                onChange={this.handleSearchChange}
              />
              <input id="searchButton" type="submit" value="Search" />
            </label>
          </form>
          <form onSubmit={this.handleSubmit} id="inputForm">
            <label>
              <input
                id="tweetInput"
                placeholder="What's on your mind?"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <input id="tweetButton" type="submit" value="Post" />
            </label>
          </form>
          
          <div>
            <input id="buttonLikes" type="submit" value="Sort by likes"onClick={() => this.sortByLikes()}>
            </input>
            <input id="buttonFollowing" type="submit" value="Filter by following"onClick={() => this.following()}>
            </input>
            <input id="buttonTime" type="submit" value="Sort by time" onClick={() => this.sortByTime()}>
            </input>
          </div>
          <Table value={this.state.textValue} />
        </>
      );
    }
  }

  root.render(<InputBox />);
}

export default Home;
