const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const showNotification = (title, body) => {
  document.getElementById("notif").play();
  new Notification(title, { body: body });
};

var focusTime = 1500; // 25 mins
var breakTime = 300; // 5 mins
var longBreakTime = 900; // 15 mins
var loopRound = 0;
var round = 0;
var isBreak = false;
var isStop = false;

const timerText = document.getElementById("timer");
const sessionText = document.getElementById("session");
const roundText = document.getElementById("round");
const startBTN = document.getElementById("start");
const stopBTN = document.getElementById("stop");
const skipBTN = document.getElementById("skip");
const resetBTN = document.getElementById("reset");

var timeLeft, timerInterval;

const getCurrentSession = () => {
  var currentSession; // focus: 0, break: 1, longBreak: 2
  var session = ["Focus", "Break", "Long Break"];

  if (!isBreak) {
    currentSession = 0;
  } else if (loopRound < 4) {
    currentSession = 1;
  } else {
    currentSession = 2;
  }

  return session[currentSession];
};

function updateText() {
  sessionText.textContent = getCurrentSession();
  roundText.textContent = round.toString();
  timerText.textContent = formatTime(timeLeft);
}
updateText();
timerText.textContent = formatTime(focusTime);

const advancePhase = () => {
  if (!isBreak) {
    isBreak = true;
    loopRound += 1;
    round += 1;
    console.log(loopRound);
    console.log(round);

    if (loopRound < 4) {
      timeLeft = breakTime;

      updateText();
      showNotification("Pymoro", "Break");
      console.log("break session");
    } else {
      timeLeft = longBreakTime;

      updateText();
      showNotification("Pymoro", "Long Break");
      console.log("long break session");
    }
  } else {
    isBreak = false;
    timeLeft = focusTime;

    updateText();
    showNotification("Pymoro", "Focus");
    console.log("focus session");

    if (loopRound == 4) {
      loopRound = 0;
      console.log("reseted round");
    }
  }
  updateText();
};

const main = (action) => {
  switch (action) {
    case "start": // send by startBTN
      resetBTN.hidden = true;
      skipBTN.hidden = true;
      startBTN.hidden = true;
      stopBTN.hidden = false;

      if (!isStop) {
        timeLeft = focusTime;
        console.log("started");
      } else {
        startBTN.textContent = "Start";
        console.log("resumed");
      }
      isStop = false;

      timerInterval = setInterval(() => {
        timeLeft--;
        updateText();

        if (timeLeft < 0) {
          advancePhase();
        }
      }, 1000);

      break;
    case "stop": // send by stopBTN
      clearInterval(timerInterval);
      console.log("stoped");
      isStop = true;

      resetBTN.hidden = false;
      skipBTN.hidden = false;
      startBTN.hidden = false;
      stopBTN.hidden = true;

      startBTN.textContent = "Resume";

      break;
    case "skip": // send by skipBTN
      clearInterval(timerInterval);
      isStop = true;

      resetBTN.hidden = true;
      skipBTN.hidden = true;
      startBTN.hidden = false;
      stopBTN.hidden = true;

      startBTN.textContent = "Start";

      advancePhase();
      console.log("skipped");

      break;
    case "reset": // send by reset
      clearInterval(timerInterval);
      timeLeft = focusTime;

      stopBTN.hidden = true;
      skipBTN.hidden = true;
      resetBTN.hidden = true;
      startBTN.hidden = false;

      startBTN.textContent = "Start";

      loopRound = 0;
      round = 0;
      isBreak = false;
      isStop = false;

      updateText();
      console.log("reseted session");

      break;
  }
};
