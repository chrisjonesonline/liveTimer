/**************/
/* Live Timer */
/**************/
var deadline = localStorage.getItem("deadline");
var x = null;

function setTimer() {
  var inputDeadline = new Date(document.getElementById("deadline").value).getTime();
  if (isNaN(inputDeadline)) {
    alert("Invalid date format. Please enter a valid deadline.");
    return;
  }

  deadline = inputDeadline;
  localStorage.setItem("deadline", deadline);

  clearInterval(x);
  x = setInterval(function() {
    var now = new Date().getTime();
    var t = deadline - now;
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    document.getElementById("day").innerHTML = days;
    document.getElementById("hour").innerHTML = hours;
    document.getElementById("minute").innerHTML = minutes;
    document.getElementById("second").innerHTML = seconds;
    if (t < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "<a href='https://www.w3schools.com/js/DEFAULT.asp' target='_blank'>COMPLETE</a>";
      document.getElementById("day").innerHTML = '0';
      document.getElementById("hour").innerHTML = '0';
      document.getElementById("minute").innerHTML = '0';
      document.getElementById("second").innerHTML = '0';
    }
  }, 1000);
}
