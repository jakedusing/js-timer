const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const restartButton = document.querySelector("#restart");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let duration;
const timer = new Timer(durationInput, startButton, restartButton, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onRestart() {
    circle.setAttribute("stroke-dasharray", perimeter);
    circle.setAttribute("stroke-dashoffset", 0);
  },
  onComplete() {
    console.log("Timer is completed");
    circle.setAttribute("stroke-dasharray", perimeter);
    circle.setAttribute("stroke-dashoffset", 0);
  },
});
