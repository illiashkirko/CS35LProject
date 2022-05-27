import React from 'react';
import ReactDOM from 'react-dom/client';
import './home.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'

function Home() 
{
    const backEndConnect= axios.create({
        baseURL : 'http://localhost:5008'
      }) 
      const root = ReactDOM.createRoot(document.getElementById('root'));

    function handleClick(event) {
        const message = { 
          _id: event[3],
          userMessages : event[0],
          numberOfLikes : event[1] + 1,
          timeK: event[2],
        }
        backEndConnect.post('/messages/update/'+event[3], message);
      }

      class CommentTable extends React.Component {
        state = {
          value:'',                           // value of current message in text box
        };

        constructor(props) {
          super(props);
      
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }
      
        handleChange(event) {
          this.setState({value: event.target.value});
        }
      
        handleSubmit(event) {
          console.log(this);
          // Find a <table> element with id="myTable":
          var table = this.refs.myTable;

          // Create an empty <tr> element and add it to the 1st position of the table:
          var row = table.insertRow(1);

          // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
          var cell1 = row.insertCell(0);

          // Add some text to the new cells:
          cell1.innerHTML = this.state.value;

          console.log(this.state.value);
          this.state.value = "";
          event.preventDefault();
        }
      
        render() {
          return (
            <>
            <table ref="myTable">
              <tbody>
              <tr>
                <td onSubmit={this.handleSubmit}>
                  <form onSubmit={this.handleSubmit}>
                  <input type="text" value={this.state.value} onChange={this.handleChange}/>
                  </form>
                </td>
              </tr>
              </tbody>
            </table>
            </>
          );
        }
      }
      
      const Table = ({value}) => {
        return (
            <>
        <table id="messageTable" >
            <tbody>
                {value.map(value =>(
                    
                    <><tr key={value[3]}>
                    <td>{value[0]}</td>
                    <td id="votingData">
                      <button id="like-button" type="button" onClick={() => handleClick(value)}> <img id="like-icon" alt="like button" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/1024px-Facebook_Like_button.svg.png" width="20em" /></button>
                    </td>
                    <td>
                      {value[1]}
                    </td>
                  </tr>
                  {/* this row contains the table of comments */}
                  <tr key="commentsRow">
                      <td> <CommentTable /></td>
                    </tr></>
                ))}
                
                </tbody>
      
        </table>
        </>
        )
      }
      
    class InputBox extends React.Component {
        state = {
          value:'',                           // value of current message in text box
          textValue: []
        };
      
        constructor(props) {
          super(props);
          this.handleChange = this.handleChange.bind(this); // handleChange handles when the textbox changes
          this.handleSubmit = this.handleSubmit.bind(this); // handles when you click the submit button 
        }
        
        handleChange(event) {    
          this.setState(
            {
              value: event.target.value         // update current value
            }
          );
      
        }
      
        handleSubmit(event) {
          //backend
          const message = { 
            userMessages : this.state.value,
            numberOfLikes : 0,
            timeK: Date.now(),
          }
          backEndConnect.post('/messages/add', message).
          then(res => console.log(res.data));
      
          this.setState(
            {
              value: ''            // sets the textbox as empty
            }
          );
      
          document.getElementById('tweetInput').value = '';   // sets the textbox to empty
          event.preventDefault();
        }
      
        render() { 
          //backEndConnect.delete('/messages/'); // deletes all messages
          backEndConnect.get('/messages/').then(res => {
            this.setState({ textValue: res.data.map(d => [d.userMessages, d.numberOfLikes, d.timeK, d._id])})
          })
          return (
            <>
            <form onSubmit={this.handleSubmit} id="inputForm">
              <label>
                <input id ="tweetInput" placeholder="What's on your mind?" type="text" value={this.state.value} onChange={this.handleChange} />
                <input id="tweetButton" type="submit" value="Link" />
              </label> 
              </form>
              <br></br>
              <Table value={this.state.textValue}/>
      
            </>
          );
        }
      }
      
      
      root.render(<InputBox />);
}


export default Home;