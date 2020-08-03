/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import './Pomodoro.css';
import {
  MorphIcon,
} from 'react-svg-buttons';
// import ReactAudioPlayer from 'react-audio-player';

const secondsToMMSS = (seconds) => {
  const date = new Date(0);
  date.setSeconds(seconds); // specify value for SECONDS here
  return date.toISOString().substr(14, 5);
};

function Pomodoro() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerID, setTimerID] = useState(0);
  const [timerState, setTimerState] = useState('Session');
  const [beep] = useState(new Audio('http://freewavesamples.com/files/Korg-Triton-Slow-Choir-ST-C4.wav'));

  useEffect(() => {
    if(timeLeft === 0) {
      beep.play();
      if(timerState === 'Session') {
        setTimerState('Break');
        setTimeLeft(() => breakLength * 60);
      } else {
        setTimerState('Session');
        setTimeLeft(() => sessionLength * 60);
      }
    }
  }, [timeLeft]);

  function playPause() {
    if (!timerRunning) {
      setTimerID(setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000));
      setTimerRunning(true);
    } else {
      clearInterval(timerID);
      setTimerRunning(false);
    }
  }

  function reset() {
    setTimeLeft(() => sessionLength * 60);
    setTimerState('Session');
    if(timerRunning) {
      clearInterval(timerID);
      setTimerRunning(false);
    }
    if(!beep.paused) {
      beep.load();
    }
  }

  function changeBreak(incrOrDecr) {
    if (!timerRunning) {
      if (incrOrDecr === 'decrement' && breakLength > 1) {
        setBreakLength(() => breakLength - 1);
        if (timerState === 'Break') {
          setTimeLeft(() => (breakLength - 1) * 60);
        }
      } else if (incrOrDecr === 'increment' && breakLength < 60) {
        setBreakLength(() => breakLength + 1);
        if (timerState === 'Break') {
          setTimeLeft(() => (breakLength + 1) * 60);
        }
      }
    }
  }

  function changeSession(incrOrDecr) {
    if (!timerRunning) {
      if (incrOrDecr === 'decrement' && sessionLength > 1) {
        setSessionLength(() => sessionLength - 1);
        if (timerState === 'Session') {
          setTimeLeft(() => (sessionLength - 1) * 60);
        }

      } else if (incrOrDecr === 'increment' && sessionLength < 60) {
        setSessionLength(() => sessionLength + 1);
        if (timerState === 'Session') {
          if (sessionLength === 59) {
            setTimeLeft(3599);
          } else {
            setTimeLeft(() => (sessionLength + 1) * 60);
          }
        }
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header" />
      <div id="clock-container">
        <title id="title">Pomodoro Clock</title>
        <h1>Pomodoro Clock</h1>

        <div id="timer-input-container">
          <div id="break" className="timer-input">
            <h2 id="break-label" className="timer-input">Break Length</h2>
            <div className="timer-input-button-container">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button type="button" id="break-decrement" data-testid="break-decrement" className="timer-button" onClick={() => { changeBreak('decrement'); }}>
                <MorphIcon
                  type="arrowDown"
                  size={40}
                  thickness={4}
                  color="#dd6e78"
                />
              </button>
              <h2 id="break-length" data-testid="break-length">{breakLength}</h2>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button type="button" id="break-increment" data-testid="break-increment" className="timer-button" onClick={() => { changeBreak('increment'); }}>
                <MorphIcon
                  type="arrowUp"
                  size={40}
                  thickness={4}
                  color="#dd6e78"
                />
              </button>
            </div>
          </div>

          <div id="session">
            <h2 id="session-label" className="timer-input">Session Length</h2>
            <div className="timer-input-button-container">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button type="button" id="session-decrement" data-testid="session-decrement" className="timer-button" onClick={() => { changeSession('decrement'); }}>
                <MorphIcon
                  id="session-decrement"
                  type="arrowDown"
                  size={40}
                  thickness={4}
                  color="#dd6e78"
                />
              </button>
              <h2 id="session-length" data-testid="session-length">{sessionLength}</h2>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button type="button" id="session-increment" data-testid="session-increment" className="timer-button" onClick={() => { changeSession('increment'); }}>
                <MorphIcon
                  id="session-increment"
                  type="arrowUp"
                  size={40}
                  thickness={4}
                  color="#dd6e78"
                />
              </button>
            </div>
          </div>
        </div>

        <div id="timer-countdown-container">
          <div id="timer-div">
            <h2 id="timer-label" data-testid="timer-label">{timerState}</h2>
          </div>
          <div id="time-left" data-testid="time-left">{secondsToMMSS(timeLeft)}</div>
        </div>

        <div id="timer-controls">
          <button id="start_stop" data-testid="start_stop" type="button" className="timer-button" onClick={playPause}>
            <MorphIcon
              id="session-increment"
              type="play"
              size={40}
              thickness={4}
              color="#dd6e78"
            />
            <MorphIcon
              id="session-increment"
              type="pause"
              size={40}
              thickness={4}
              color="#dd6e78"
            />
          </button>
          { /* eslint-disable-next-line react/button-has-type */ }
          <button id="reset" data-testid="reset" type="reset" className="timer-button" onClick={reset}>
            <MorphIcon
              id="session-increment"
              type="arrowLeft"
              size={40}
              thickness={4}
              color="#dd6e78"
            />
          </button>
        </div>

      </div>
    </div>
  );
}

export default Pomodoro;
export {
  secondsToMMSS,
  Pomodoro,
};
