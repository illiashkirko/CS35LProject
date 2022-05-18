import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Table from './Table'
import axios from 'axios'


const backEndConnect= axios.create({
  baseURL : 'http://localhost:5000'
}) 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


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
      ///timeK: Date().toString(),
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
    // when you submit calls handleSubmit
  inputBox() {
  <form onSubmit={this.handleSubmit}>    
        <label>
          <input id="tweetInput" type="text" value={this.state.value} onChange={this.handleChange} />
          <input id="tweetButton" type="submit" value="Link" />
        </label> 
        </form>  
  }

  render() { 
    
    backEndConnect.get('/messages/').then(res => {
      this.setState({ textValue: res.data.map(d => [d.userMessages, d.numberofLikes, d._id])})
    })
    return (
      <>
      <form onSubmit={this.handleSubmit}>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
