import {connect} from 'react-redux';
import HumitureComponent from '../component/HumitureComponent';

function mapStateToProps(state) {
  return state.humitureReducer;
}

const Humiture = connect(mapStateToProps)(HumitureComponent);

export default Humiture;