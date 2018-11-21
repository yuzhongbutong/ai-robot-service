import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const socket = require('socket.io-client')(':8990');

class App extends Component {

  constructor() {
    super();
    this.state = {
        message: ''
    };
  }

  componentDidMount() {
    let message;
    socket.on('ht', (data) => {
      this.setState({message: message += '\n' + data});
    });
  }

  runCar(direction) {
    socket.emit('car', direction);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button className="btn btn-success" onClick={this.runCar.bind(this, 'F')}>Forward</button>
          <button className="btn btn-success" onClick={this.runCar.bind(this, 'B')}>Backward</button>
            {this.state.message}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
