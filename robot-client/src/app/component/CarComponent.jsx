import React, {Component} from 'react';

class CarComponent extends Component {
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
        <button className="btn btn-success" onClick={this.moveCar.bind(this, 'F')}>Forward</button>
        <button className="btn btn-success" onClick={this.moveCar.bind(this, 'B')}>Backward</button>
        <button className="btn btn-success" onClick={this.moveCar.bind(this, 'S')}>Stop</button>
      </div>
    )
  }
}

export default CarComponent;