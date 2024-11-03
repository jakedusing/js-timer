class Timer {
  constructor(durationInput, startButton, restartButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.restartButton = restartButton;
    this.startingVal = this.durationInput.value;

    this.state = 0;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onRestart = callbacks.onRestart;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", () => {
      if (this.startButton.innerHTML === `<i class="fas fa-play"></i>`) {
        //  if you are starting timer for the first time
        if (this.state === 0) {
          this.startButton.innerHTML = `<i class="fas fa-pause"></i>`;
          this.start();
          this.state = 1;
        }
        // If you paused the timer and want to resume
        else if (this.state === 2) {
          // If the inpuyt is changed on resume, restart the timer
          if (this.durationInput.value != this.timeRemaining) {
            this.restart();
          } else {
            //resume the timer
            this.startButton.innerHTML = `<i class="fas fa-pause"></i>`;
            this.resume();
            this.state = 3;
          }
        }
      }
      //if the button icon is pause
      else if (
        this.startButton.innerHTML === `<i class="fas fa-pause"></i>` &&
        this.timeRemaining > 0
      ) {
        this.startButton.innerHTML = `<i class="fas fa-play"></i>`;
        this.pause();
        this.state = 2;
      }
    });

    // Restart Button
    this.restartButton.addEventListener("click", () => {
      this.restart();
    });

    // changing the input value will change the starting val and restart the timer
    this.durationInput.addEventListener("change", () => {
      this.pause();
      this.startingVal = this.durationInput.value;
      this.restart();
    });
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.startingVal = this.durationInput.value;
    this.tick();
    this.interval = setInterval(this.tick, 20);
  };

  pause = () => {
    if (this.onPause) {
      this.onPause(this.timeRemaining);
    }
    clearInterval(this.interval);
  };

  resume() {
    if (this.onResume) {
      this.onResume(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 20);
  }

  restart() {
    if (this.onRestart) {
      this.onRestart();
    }
    if (this.state != 0) {
      this.startButton.innerHTML = `<i class="fas fa-play"></i>`;
    }
    this.state = 0;
    clearInterval(this.interval);

    this.durationInput.value = this.startingVal;
  }

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      this.startButton.innerHTML = `<i class="fas fa-play"></i>`;
      if (this.onComplete) {
        this.onComplete();
        this.reset();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  reset = () => {
    this.timeRemaining = 10;
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
