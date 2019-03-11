import {connect} from 'react-redux';
import ChatInteractiveComponent from './../../component/chat/ChatInteractiveComponent';
import {setDirection, pushMessage} from './../../../model/action';

function mapStateToProps(state) {
  return {
    appReducer: state.appReducer,
    chatReducer: state.chatReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDirection: (direction) => dispatch(setDirection(direction)),
    pushMessage: (message) => dispatch(pushMessage(message))
  };
}

const ChatInteractive = connect(mapStateToProps, mapDispatchToProps)(ChatInteractiveComponent);

export default ChatInteractive;