import {connect} from 'react-redux';
import HumitureComponent from './../../component/monitor/HumitureComponent';

function mapStateToProps(state) {
  return {
    humitureReducer: state.humitureReducer
  };
}

const Humiture = connect(mapStateToProps)(HumitureComponent);

export default Humiture;