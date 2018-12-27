import {connect} from 'react-redux';
import CarComponent from './../component/CarComponent';

function mapStateToProps(state) {
  return state.appReducer;
}

const Car = connect(mapStateToProps)(CarComponent);

export default Car;