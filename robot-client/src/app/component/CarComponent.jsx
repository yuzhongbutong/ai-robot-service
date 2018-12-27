import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretUp} from '@fortawesome/free-solid-svg-icons';
import {faStop} from '@fortawesome/free-solid-svg-icons';

class CarComponent extends Component {
  componentDidMount() {
    this.height = document.getElementById('remoteControl').clientWidth;
  }

  moveCar = (direction) => {
    const {socket} = this.props;
    const message = {
      car: {
        direction: direction
      }
    };
    socket.emit('car', JSON.stringify(message));
  }

  render() {
    return (
      <div>
        <div id="remoteControl" style={{
          width: '80%',
          height: this.height,
          maxWidth: '400px',
          margin: 'auto'
        }}>
          <div className="menu-container">
            <div className="menu-wrapper">
              <ul>
                <li>
                  <span onClick={() => this.moveCar('F')}>
                    <span>
                      <FontAwesomeIcon icon={faCaretUp} size="5x"/>
                    </span>
                  </span>
                </li>
                <li>
                  <span href="#" onClick={() => this.moveCar('R')}>
                    <span>
                      <FontAwesomeIcon icon={faCaretUp} size="5x"/>
                    </span>
                  </span>
                </li>
                <li>
                  <span href="#" onClick={() => this.moveCar('B')}>
                    <span>
                      <FontAwesomeIcon icon={faCaretUp} size="5x"/>
                    </span>
                  </span>
                </li>
                <li>
                  <span href="#" onClick={() => this.moveCar('L')}>
                    <span>
                      <FontAwesomeIcon icon={faCaretUp} size="5x"/>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <ul>
              <li>
                <span href="#" onClick={() => this.moveCar('S')}>
                  <FontAwesomeIcon icon={faStop} size="3x"/>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default CarComponent;