import React, {Component} from 'react';
import './App.css';
import Humiture from './../container/Humiture';
import Car from './../container/Car';

class AppComponent extends Component {

  componentDidMount() {
    const {setSocket, setHumiture} = this.props;
    const socket = require('socket.io-client')(':8990');
    socket.on('ht', (data) => {
      const humiture = JSON.parse(data);
      setHumiture(humiture);
    });
    setSocket(socket);
  }

  render() {
    return (
      <div>
        <Humiture/>
        <Car/>
      </div>
    )
  }
}

export default AppComponent;
