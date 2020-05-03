import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
    }

  }



  componentDidMount() {
    this.getMessage();
  }

  getMessage = () => {
    fetch('/message')
    .then(res => res.json())
    .then(result => this.setState({ message: result }))
  }



  render() {
    const { message } = this.state;
    return (
      <div className="App">
        <h1> {`${message.message}`} </h1>
      </div>
    )
  }
}

export default App;
