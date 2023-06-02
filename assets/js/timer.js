var x = null;
var deadline = null;
var elapsedTime = null;

function setTimer() {
  var inputDeadline = new Date(document.getElementById("deadline").value).getTime();
  if (isNaN(inputDeadline)) {
    alert("Invalid date format. Please enter a valid deadline.");
    return;
  }

  var storedDeadline = localStorage.getItem("deadline");
  var storedElapsedTime = localStorage.getItem("elapsedTime");

  deadline = storedDeadline ? parseInt(storedDeadline, 10) : inputDeadline;
  elapsedTime = storedElapsedTime ? parseInt(storedElapsedTime, 10) : 0;

  var currentTime = new Date().getTime();
  var timeElapsedSinceDeadline = currentTime - (deadline + elapsedTime);

  if (timeElapsedSinceDeadline > 0) {
    deadline += timeElapsedSinceDeadline;
    elapsedTime += timeElapsedSinceDeadline;
  }

  localStorage.setItem("deadline", deadline);
  localStorage.setItem("elapsedTime", elapsedTime);

  clearInterval(x);
  x = setInterval(function() {
    var now = new Date().getTime();
    var t = deadline - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    document.getElementById("day").textContent = days;
    document.getElementById("hour").textContent = hours;
    document.getElementById("minute").textContent = minutes;
    document.getElementById("second").textContent = seconds;
    if (t < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "<a href='https://www.w3schools.com/js/DEFAULT.asp' target='_blank'>COMPLETE</a>";
      document.getElementById("day").textContent = '0';
      document.getElementById("hour").textContent = '0';
      document.getElementById("minute").textContent = '0';
      document.getElementById("second").textContent = '0';
      localStorage.removeItem("deadline");
      localStorage.removeItem("elapsedTime");
    }
  }, 1000);
}

function updateTimer() {
  clearInterval(x);
  localStorage.removeItem("deadline");
  localStorage.removeItem("elapsedTime");
  setTimer();
}

window.onload = function() {
  var storedDeadline = localStorage.getItem("deadline");
  if (storedDeadline) {
    deadline = parseInt(storedDeadline, 10);
    document.getElementById("deadline").value = new Date(deadline).toISOString().substring(0, 16);
    setTimer();
  }
  
  document.getElementById("deadline").addEventListener("change", updateTimer);
};
