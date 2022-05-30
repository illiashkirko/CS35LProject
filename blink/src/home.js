import React from "react";
import ReactDOM from "react-dom/client";
import "./home.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";


function Home() {
  const backEndConnect = axios.create({
    baseURL: "http://localhost:5035",
  });
  
  const root = ReactDOM.createRoot(document.getElementById("root"));

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
  function goToProfile(userName) {
    window.location.href = '/profile/'+userName;
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
      this.state.value = ""; //clear value in text box
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
                  <td><p onClick={() => goToProfile(value.user)}>@{value.user}</p></td>
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

  class InputBox extends React.Component {
    state = {
      value: "", // value of current message in text box
      textValue: [],
      sortedByLikes: false, //by default sort by time (not by likes)
      search: "", // value to search
      currSearching: true, // indicates that the user can input search queries, false - if user submitted a query
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
        sortedByLikes: true,
      });
    }
    sortByTime() {
      console.log("timesort");
      this.setState({
        sortedByLikes: false,
      });
    }
    updateMessages() {
      if (this.state.search != "" && this.state.currSearching == false) {
        backEndConnect
          .get("/messages/search/" + this.state.search, this.state.search)
          .then((res) => {
            this.setState({
              textValue: res.data.slice(),
            });
          });
      } else if (this.state.sortedByLikes == false) {
        backEndConnect.get("/messages/").then((res) => {
          this.setState({
            textValue: res.data.slice()
          });
        });
      } else {
        backEndConnect.get("/messages/sortedbylikes").then((res) => {
          this.setState({
            textValue: res.data.slice(), 
          });
        });
      }
    }

    render() {
      //backEndConnect.delete('/messages/'); // deletes all messages
      this.updateMessages();
      return (
        <>
        <div>
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
          <a id="link" href='/login'><u>LOG OUT</u></a>
        </div>
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
