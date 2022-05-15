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
    messages: [],
    textValue: Array(0).fill(null), // array of messages
    value:''                        // value of current message in text box
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
    const textValue = this.state.textValue.slice(); // copy array into textValue
    textValue.unshift(this.state.value);            // adds new val to array
    //backend
    const message ={ 
      userMessages : this.state.value,
      numberOfLikes : "5"
    }
    backEndConnect.post('/messages/add', message).
    then(res => console.log(res.data));

    // todo
    this.setState(
      {
        value: null,            // sets the textbox as empty
        textValue: textValue    // updates the array of messages
      }
      

    );

    
    document.getElementById('tweetInput').value = '';   // sets the textbox to empty
    event.preventDefault();
  }
    // when you submit calls handleSubmit
   inputBox(){
<form onSubmit={this.handleSubmit}>    
        <label>
          <input id ="tweetInput" type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Tweet" />
        </label> 
        </form>
   }

  render() {
    backEndConnect.get('/messages/').then(res =>{
      this.setState(
        { 
           messages: res.data,
            textValue: res.data.map(d => d.userMessages)
        }
        )

    })
    return (
      <>
      <form onSubmit={this.handleSubmit}>
        <label>
          <input id ="tweetInput" type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Tweet" />
        </label> 
        </form>
      
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
