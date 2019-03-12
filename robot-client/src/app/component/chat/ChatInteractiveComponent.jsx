import React, {Component} from 'react';
import {Overlay, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons';
import {faKeyboard} from '@fortawesome/free-solid-svg-icons';

import Constant from './../../common/Constant';

class ChatInteractiveComponent extends Component {

  constructor(props) {
    super(props);
    this.attachRef = target => this.setState({target});
    this.state = {
      draftMessage: '',
      isVoice: false
    };

    const {messages, pushMessage} = this.props;
    if (messages.length === 0) {
      pushMessage({
        from: Constant.MSG_FROM_ROBOT,
        text: 'Welcome to the AI chat.',
        time: this.getDateTime()
      });
    }
  }

  componentDidUpdate() {
    const inputBox = document.getElementById('draftMessageID');
    if (inputBox) {
      inputBox.focus();
    }
  }

  handleChange(event) {
    this.setState({
      draftMessage: event.target.value
    });
  }

  toggleVoice() {
    const {isVoice} = this.state;
    this.setState({
      isVoice: !isVoice
    });
  }

  getDateTime() {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  sendMessage(event) {
    if (event && event.charCode !== 13) {
      return;
    }
    const {draftMessage} = this.state;
    if (draftMessage.search(/\S/) === -1) {
      this.setState({
        isTextEmpty: true
      });
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.timer = setInterval(() => {
        this.setState({
          isTextEmpty: false
        });
      }, 1000);
    } else {
      this.pushMessage(draftMessage, Constant.MSG_FROM_CUSTOM);
      this.setResponse(draftMessage);
    }
    this.setState({
      draftMessage: ''
    });
  }

  setResponse(draftMessage) {
    const upperDraftMessage = draftMessage.toUpperCase();
    const commandKeys = Object.keys(Constant.CAR_COMMAND);
    let command, text, content;
    if (draftMessage.length === 1) {
      if (commandKeys.indexOf(upperDraftMessage) !== -1) {
        command = upperDraftMessage;
        text = Constant.CAR_COMMAND[upperDraftMessage].value;
      }
    } else {
      for (const key in Constant.CAR_COMMAND) {
        const direction = Constant.CAR_COMMAND[key];
        for (const keyword of direction.keywords) {
          if (upperDraftMessage.indexOf(keyword) !== -1) {
            command = key;
            text = direction.value;
          }
        }
      }
    }
    if (command) {
      const {socket, setDirection} = this.props;
    setDirection(command);
      const message = {
        car: {
          direction: command
        }
      };
      socket.emit('car', JSON.stringify(message));
      content = `Execute command: [${text}]`;
    } else {
      content = 'Sorry, I didn\'t understand. Could you try to rephrasing?';
    }
    this.pushMessage(content, Constant.MSG_FROM_ROBOT);
  }

  pushMessage(content, from) {
    const {pushMessage} = this.props;
    pushMessage({
      from: from,
      text: content,
      time: this.getDateTime()
    });
  }

  render() {
    const {isVoice, draftMessage} = this.state;
    let inputWay;
    if (isVoice) {
      inputWay = <button className="btn btn-info chat-interactive-voice">Hold down to speak ...</button>;
    } else {
      const {isTextEmpty, target} = this.state;
      inputWay = <>
      <Overlay target={target} show={isTextEmpty} placement="top">
        <Tooltip id="emptyTextID">Please enter the correct message!</Tooltip>
      </Overlay>
      <input id="draftMessageID" className="form-control" ref={this.attachRef} value={draftMessage}
             onChange={this.handleChange.bind(this)} onKeyPress={(event) => this.sendMessage(event)}/>
      <button className="btn btn-info" onClick={() => this.sendMessage()}>Send</button>
      </>;
    }

    return (
      <div className="chat-interactive-root">
        <button className="btn btn-info chat-interactive-toggle" onClick={() => this.toggleVoice()}>
          <FontAwesomeIcon icon={isVoice ? faKeyboard : faMicrophone}/>
        </button>
        {inputWay}
      </div>
    )
  }
}

export default ChatInteractiveComponent;