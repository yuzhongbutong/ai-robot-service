import React, {Component} from 'react';
import {Overlay, Tooltip} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons';
import {faKeyboard} from '@fortawesome/free-solid-svg-icons';
import AudioRecorder from './../../common/AudioRecorder';
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
        time: new Date().format(Constant.MSG_TIME_FORMAT)
      });
    }

    this.audioRecorder = new AudioRecorder();
  }

  componentDidMount() {
    const {socket} = this.props;
    socket.on('audio', (data) => {
      if (data) {
        this.pushMessage(data, Constant.MSG_FROM_CUSTOM);
        this.setResponse(data);
      } else {
        this.pushMessage('Sorry, I can\'t recognize your voice. Please try again.', Constant.MSG_FROM_ROBOT);
      }
    });
    socket.on('analyzer', (data) => {
      let content;
      const result = JSON.parse(data);
      if (result.text) {
        content = result.text;
        if (result.command.music) {
          const player = document.querySelector('audio');
          if (result.command.music === '播放') {
            player.play();
          } else if (result.command.music === '停止') {
            player.pause();
          }
        }
      } else {
        content = 'Sorry, I didn\'t understand. Could you try to rephrasing?';
      }
      this.pushMessage(content, Constant.MSG_FROM_ROBOT);
    });
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

  setResponse(msgText) {
    const upperDraftMessage = msgText.toUpperCase();
    const commandKeys = Object.keys(Constant.CAR_COMMAND);
    let command, text;
    if (msgText.length === 1) {
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
    const {socket, setDirection} = this.props;
    if (command) {
      setDirection(command);
      const message = {
        car: {
          direction: command
        }
      };
      socket.emit('car', JSON.stringify(message));
      const content = `Execute command: [${text}]`;
      this.pushMessage(content, Constant.MSG_FROM_ROBOT);
    } else {
      socket.emit('analyzer', msgText);
    }
  }

  pushMessage(msgText, from) {
    const {pushMessage} = this.props;
    pushMessage({
      from: from,
      text: msgText,
      time: new Date().format(Constant.MSG_TIME_FORMAT)
    });
  }

  startOrStop() {
    if (this.isRecording) {
      this.audioRecorder.stop((blob) => {
        this.isRecording = false;
        const {socket} = this.props;
        socket.emit('audio', blob);
      });
    } else {
      this.isRecording = true;
      this.audioRecorder.start();
    }
  }

  render() {
    const {isVoice, draftMessage} = this.state;
    let inputWay;
    if (isVoice) {
      inputWay =
        <button className="btn btn-info chat-interactive-voice" onClick={() => this.startOrStop()}>Hold down to speak
          ...</button>;
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
        <audio>
          <source
            src="http://m10.music.126.net/20190321094459/aa1a6d8852d0ea4f30836c3147f5b325/ymusic/9fe1/20d0/619a/1cd69893cbe96f0acbb17218de6cd9cc.mp3"/>
        </audio>
        <button className="btn btn-info chat-interactive-toggle" onClick={() => this.toggleVoice()}>
          <FontAwesomeIcon icon={isVoice ? faKeyboard : faMicrophone}/>
        </button>
        {inputWay}
      </div>
    )
  }
}

export default ChatInteractiveComponent;