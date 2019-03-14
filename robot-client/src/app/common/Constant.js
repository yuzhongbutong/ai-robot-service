export default {
  INDEX_TAB_0: 0,
  INDEX_TAB_1: 1,
  INDEX_TAB_2: 2,

  CAR_COMMAND: {
    F: {
      value: 'FORWARD',
      keywords: ['FORWARD', 'GO', 'RUN']
    },
    R: {
      value: 'RIGHTWARD',
      keywords: ['RIGHTWARD', 'RIGHT']
    },
    B: {
      value: 'BACKWARD',
      keywords: ['BACKWARD', 'BACK']
    },
    L: {
      value: 'LEFTWARD',
      keywords: ['LEFTWARD', 'LEFT']
    },
    S: {
      value: 'STOP',
      keywords: ['STOP', 'PAUSE']
    }
  },

  MSG_FROM_ROBOT: 'robot',
  MSG_FROM_CUSTOM: 'custom',
  MSG_TIME_FORMAT: 'hh:mm:ss'
};