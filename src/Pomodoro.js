/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import logo from './logo.svg';
import './Pomodoro.css';

function Pomodoro() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <div id='clock-container'>
        <div id='timer-inputs'>
          <div id='break'>
            <div id='break-label'>
            
            </div>
            <div id='break-decrement'>

            </div>
            <div id='break-length'>

            </div>
            <div id='break-increment'>

            </div>
          </div>
          <div id='session'>
            <div id='session-label'>

            </div>
            <div id='session-decrement'>

            </div>
            <div id='session-length'>

            </div>
            <div id='session-increment'>

            </div>
          </div>
          
        </div>

        <div id='timer'>
          <div id='timer-label'>

          </div>
          <div id='time-left'>
            
          </div>
        </div>

        <div id='timer-controls'>
          <div id='start_stop'>

          </div>
          <div id='reset'>
            
          </div>
        </div>


      </div>
    </div>
  );
}

export default Pomodoro;
