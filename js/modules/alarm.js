const audioTimesUp = {
  work: new Audio('audio/ritm.mp3'),
  break: new Audio('audio/to-be-continued.mp3'),
  relax: new Audio('audio/wave.mp3') 
};

const alarmTimesUp = (status) => {
  audioTimesUp[status].play();
}

const stopAlarm = (status) => {
  audioTimesUp[status].pause();
}

export { alarmTimesUp, stopAlarm };