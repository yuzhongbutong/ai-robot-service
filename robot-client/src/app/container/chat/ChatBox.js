import {connect} from 'react-redux';
import ChatBoxComponent from './../../component/chat/ChatBoxComponent';

function mapStateToProps(state) {
  return {
    chatReducer: state.chatReducer
  };
}

const ChatBox = connect(mapStateToProps)(ChatBoxComponent);

export default ChatBox;