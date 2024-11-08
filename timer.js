class Timer {
  constructor(durationInput, startButton, restartButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.restartButton = restartButton;
    this.startingVal = this.durationInput.value;

    this.state = 0;

    // If callbacks are provided, assign them to instance variables
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onRestart = callbacks.onRestart;
      this.onComplete = callbacks.onComplete;
    }

    // Event listener for the start/pause button
    this.startButton.addEventListener("click", () => {
      if (this.startButton.innerHTML === `<i class="fas fa-play"></i>`) {
        //  if you are starting timer for the first time
        if (this.state === 0) {
          this.startButton.innerHTML = `<i class="fas fa-pause"></i>`;
          this.start();
          this.state = 1;
        }
        // resuming a paused timer
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
      //if the button shows pause and there is time remaining
      else if (
        this.startButton.innerHTML === `<i class="fas fa-pause"></i>` &&
        this.timeRemaining > 0
      ) {
        this.startButton.innerHTML = `<i class="fas fa-play"></i>`;
        this.pause();
        this.state = 2;
      }
    });

    // Event listener for Restart Button
    this.restartButton.addEventListener("click", () => {
      this.restart();
    });

    // Event listener for changes in the duration input
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
