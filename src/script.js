const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

function showNotification(title, body) {
  new Notification(title, { body: body });
}

var focusTime = 1500; // 25 mins
var breakTime = 300; // 5 mins
var longBreakTime = 900; // 15 mins
var round = 0;
var isBreak = false;
var isStop = false;

const timerText = document.getElementById("timer");
const sessionText = document.getElementById("session");
const startBTN = document.getElementById("start");
const stopBTN = document.getElementById("stop");
const skipBTN = document.getElementById("skip");
const resetBTN = document.getElementById("reset");

timerText.textContent = formatTime(focusTime);

var timeLeft, timerInterval;

const getCurrentSession = () => {
  var currentSession; // focus: 0, break: 1, longBreak: 2
  var session = ["Focus", "Break", "Long Break"];

  if (!isBreak) {
    currentSession = 0;
  } else if (round < 4) {
    currentSession = 1;
  } else {
    currentSession = 2;
  }

  return session[currentSession];
};

sessionText.textContent = getCurrentSession();

const advancePhase = () => {
  if (!isBreak) {
    isBreak = true;
    round += 1;
    console.log(round);

    if (round < 4) {
      timeLeft = breakTime;
      timer.textContent = formatTime(timeLeft);

      showNotification("Pymoro", "Break");
      sessionText.textContent = getCurrentSession();
      console.log("break session");
    } else {
      timeLeft = longBreakTime;
      timer.textContent = formatTime(timeLeft);

      showNotification("Pymoro", "Long Break");
      sessionText.textContent = getCurrentSession();
      console.log("long break session");
    }
  } else {
    isBreak = false;
    timeLeft = focusTime;
    timer.textContent = formatTime(timeLeft);

    showNotification("Pymoro", "Focus");
    sessionText.textContent = getCurrentSession();
    console.log("focus session");

    if (round == 4) {
      round = 0;
      console.log("reseted round");
    }
  }
  timer.textContent = formatTime(timeLeft);
};

const main = (action) => {
  switch (action) {
    case "start": // send by startBTN
      startBTN.hidden = true;
      stopBTN.hidden = false;

      if (!isStop) {
        timeLeft = focusTime;
        console.log("started");
      } else {
        console.log("resumed");
      }
      isStop = false;

      timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = formatTime(timeLeft);

        if (timeLeft < 0) {
          advancePhase();
        }
      }, 1000);

      break;
    case "stop": // send by stopBTN
      clearInterval(timerInterval);
      console.log("stoped");

      isStop = true;
      stopBTN.hidden = true;
      startBTN.hidden = false;

      break;
    case "skip": // send by skipBTN
      clearInterval(timerInterval);

      isStop = true;
      stopBTN.hidden = true;
      startBTN.hidden = false;

      advancePhase();
      console.log("skipped");

      break;
    case "reset": // send by reset
      clearInterval(timerInterval);

      isStop = false;
      stopBTN.hidden = true;
      startBTN.hidden = false;

      round = 0;
      isBreak = false;
      isStop = false;
      timerText.textContent = formatTime(focusTime);

      showNotification("Pymoro", "Reseted Session");
      sessionText.textContent = getCurrentSession();
      console.log("reseted session");

      break;
  }
};
