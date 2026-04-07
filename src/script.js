const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

var workTime = 1500; // 25 mins
var breakTime = 300; // 5 mins
var longBreakTime = 900; // 15 mins
var round = 0;
var isBreak = false;
var isStop = false;

const timerText = document.getElementById("timer");
const startBTN = document.getElementById("start");
const stopBTN = document.getElementById("stop");
const skipBTN = document.getElementById("skip");

timerText.textContent = formatTime(workTime);

var timeLeft, timerInterval;

const main = (action) => {
  switch (action) {
    case "start": // send by startBTN
      startBTN.hidden = true;
      stopBTN.hidden = false;

      if (!isStop) {
        timeLeft = workTime;
      }
      isStop = false;

      timerInterval = setInterval(() => {
        timer.textContent = formatTime(timeLeft);
        timeLeft--;
        timer.textContent = formatTime(timeLeft);

        if (timeLeft < 0) {
          if (!isBreak) {
            isBreak = true;
            round += 1;

            if (round < 4) {
              timeLeft = breakTime;
              timer.textContent = formatTime(timeLeft);
            } else {
              timeLeft = longBreakTime;
              timer.textContent = formatTime(timeLeft);
            }
          } else {
            isBreak = false;
            timeLeft = workTime;
            timer.textContent = formatTime(timeLeft);

            if (round == 4) {
              round = 0;
            }
          }
        }
      }, 1000);

      break;
    case "stop": // send by stopBTN
      clearInterval(timerInterval);
      isStop = true;
      stopBTN.hidden = true;
      startBTN.hidden = false;

      break;
    case "skip": // send by skipBTN
      clearInterval(timerInterval);
      isStop = true;
      stopBTN.hidden = true;
      startBTN.hidden = false;

      // Same logic as timerInterval
      if (!isBreak) {
        isBreak = true;
        round += 1;

        if (round < 4) {
          timeLeft = breakTime;
          timer.textContent = formatTime(timeLeft);
        } else {
          timeLeft = longBreakTime;
          timer.textContent = formatTime(timeLeft);
        }
      } else {
        isBreak = false;
        timeLeft = workTime;
        timer.textContent = formatTime(timeLeft);

        if (round == 4) {
          round = 0;
        }
      }

      break;
  }
};
