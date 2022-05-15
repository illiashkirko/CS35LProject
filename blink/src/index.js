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
    textValue: Array(0).fill(null),
    value:''
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {    
    this.setState(
      {
        value: event.target.value
       // textValue: this.state.textValue
      }

    );

  }

  handleSubmit(event) {
    const textValue = this.state.textValue.slice();
    textValue.push(this.state.value);
    const message ={ 
      userMessages : this.state.value,
      numberOfLikes : "5"
    }
    backEndConnect.post('/messages/add', message).
    then(res => console.log(res.data));
    this.setState(
      {
        value: null,
        textValue: textValue
      }
      

    );

    
    document.getElementById('tweetInput').value = '';
    event.preventDefault();
  }
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
