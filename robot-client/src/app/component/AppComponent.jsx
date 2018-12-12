import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRobot} from '@fortawesome/free-solid-svg-icons';
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
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container app-container">
            <FontAwesomeIcon icon={faRobot} size="3x"/>
            <span className="app-container-title">Intelligent Robot</span>
          </div>
        </nav>
        <div className="app-content">
          <Humiture/>
          <Car/>
        </div>
      </div>
    )
  }
}

export default AppComponent;
