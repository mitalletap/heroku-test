import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
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
      <h1> {message} </h1>
    )
  }
}

export default App;
