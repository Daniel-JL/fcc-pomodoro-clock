import React from 'react';
import { cleanup, fireEvent, render, getByTestId } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Pomodoro, secondsToMMSS } from './Pomodoro';

beforeEach(() => {
  jest.useFakeTimers();
});

test('secondsToMMSS should convert number input to MMSS format', () => {
  expect(secondsToMMSS(100)).toBe('01:40');
});

describe('Reset button', () => {
  test('Reset button resets timer', () => {
    const { getByTestId } = render(
      <Pomodoro />,
    );
    const resetButton = getByTestId('reset');
    const startStopButton = getByTestId('start_stop');
    const timeLeft = getByTestId('time-left');

    act(() => {
      fireEvent.click(startStopButton);
    });
    expect(timeLeft.textContent).toBe('25:00');
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(timeLeft.textContent).toBe('24:58');
    act(() => {
      fireEvent.click(resetButton);
    });
    expect(timeLeft.textContent).toBe('25:00');
  });
});

describe('Break and session time input', () => {
  test('"break-decrement" button decrements "break-length" and "break-increment" button increments "break-length"', () => {
    const { getByTestId } = render(
      <Pomodoro />,
    );
    const breakLength = getByTestId('break-length');
    const decrementButton = getByTestId('break-decrement');
    const incrementButton = getByTestId('break-increment');

    expect(breakLength.textContent).toBe('5');
    act(() => {
      fireEvent.click(decrementButton);
    });
    expect(breakLength.textContent).toBe('4');
    act(() => {
      fireEvent.click(incrementButton);
    });
    expect(breakLength.textContent).toBe('5');
  });

  test('"session-decrement" button decrements "session-length" and "session-increment" button increments "session-length"', () => {
    const { getByTestId } = render(
      <Pomodoro />,
    );
    const sessionLength = getByTestId('session-length');
    const decrementButton = getByTestId('session-decrement');
    const incrementButton = getByTestId('session-increment');

    expect(sessionLength.textContent).toBe('25');
    act(() => {
      fireEvent.click(decrementButton);
    });
    expect(sessionLength.textContent).toBe('24');
    act(() => {
      fireEvent.click(incrementButton);
    });
    expect(sessionLength.textContent).toBe('25');
  });

  test('60 > Session/break length >= 0', () => {
    const { getByTestId } = render(
      <Pomodoro />,
    );
    const breakLength = getByTestId('break-length');
    const sessionLength = getByTestId('session-length');
    const breakDecrementButton = getByTestId('break-decrement');
    const breakIncrementButton = getByTestId('break-increment');
    const sessionDecrementButton = getByTestId('session-decrement');
    const sessionIncrementButton = getByTestId('session-increment');
    const breakLengthInitialValue = 5;
    const sessionLengthInitialValue = 25;

    expect(breakLength.textContent).toBe(`${breakLengthInitialValue}`);
    expect(sessionLength.textContent).toBe(`${sessionLengthInitialValue}`);

    //  Checks that break length cannot go below 0
    for (let i = 1; i <= breakLengthInitialValue; i++) {
      act(() => {
        fireEvent.click(breakDecrementButton);
      });
      if (i === breakLengthInitialValue) {
        expect(breakLength.textContent).toBe('1');
      } else {
        expect(breakLength.textContent).toBe(`${breakLengthInitialValue - i}`);
      }
    }

    //  Checks that session length cannot go below 0
    for (let i = 1; i <= sessionLengthInitialValue; i++) {
      act(() => {
        fireEvent.click(sessionDecrementButton);
      });
      if (i === sessionLengthInitialValue) {
        expect(sessionLength.textContent).toBe('1');
      } else {
        expect(sessionLength.textContent).toBe(`${sessionLengthInitialValue - i}`);
      }
    }

    //  Checks that neither break length or session length can go above 60
    for (let i = 1; i <= 60; i++) {
      act(() => {
        fireEvent.click(sessionIncrementButton);
      });
      act(() => {
        fireEvent.click(breakIncrementButton);
      });

      if (i === 60) {
        expect(sessionLength.textContent).toBe('60');
        expect(breakLength.textContent).toBe('60');

      } else {
        expect(sessionLength.textContent).toBe(`${i + 1}`);
        expect(breakLength.textContent).toBe(`${i + 1}`);
      }
    }
  });
});

describe('Start/stop button', () => {
  test('Start/stop button begins timer running, pressing again pauses timer.', () => {
    const { getByTestId } = render(
      <Pomodoro />,
    );
    const startStopButton = getByTestId('start_stop');
    const timeLeft = getByTestId('time-left');

    act(() => {
      fireEvent.click(startStopButton);
    });
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(timeLeft.textContent).toBe('25:00');
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(timeLeft.textContent).toBe('24:58');

    act(() => {
      fireEvent.click(startStopButton);
    });
    expect(clearInterval).toHaveBeenCalledTimes(1);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(timeLeft.textContent).toBe('24:58');

  });

  test('Start/Stop button stops break_length and session_length from being changed.', () => {
    const { getByTestId } = render(
      <Pomodoro />,
    );
    const breakLength = getByTestId('break-length');
    const sessionLength = getByTestId('session-length');
    const breakDecrementButton = getByTestId('break-decrement');
    const breakIncrementButton = getByTestId('break-increment');
    const sessionDecrementButton = getByTestId('session-decrement');
    const sessionIncrementButton = getByTestId('session-increment');
    const startStopButton = getByTestId('start_stop');

    expect(sessionLength.textContent).toBe('25');
    expect(breakLength.textContent).toBe('5');

    act(() => {
      fireEvent.click(startStopButton);
    });

    act(() => {
      fireEvent.click(breakDecrementButton);
    });
    expect(breakLength.textContent).toBe('5');
    act(() => {
      fireEvent.click(breakIncrementButton);
    });
    expect(breakLength.textContent).toBe('5');

    act(() => {
      fireEvent.click(sessionDecrementButton);
    });
    expect(sessionLength.textContent).toBe('25');
    act(() => {
      fireEvent.click(sessionIncrementButton);
    });
    expect(sessionLength.textContent).toBe('25');
  });
});

describe('Timer', () => {
  test('When a session timer ends (00:00) a break timer should begin and show string that break has begun. When the break timer ends a session timer should begin and show string that session has begun', () => {
    const { getByTestId } = render(
      <Pomodoro />,
    );
    const startStopButton = getByTestId('start_stop');
    const timeLeft = getByTestId('time-left');
    const timerLabel = getByTestId('timer-label');

    act(() => {
      fireEvent.click(startStopButton);
    });
    expect(timeLeft.textContent).toBe('25:00');

    act(() => {
      jest.advanceTimersByTime(1500000);
    });
    expect(timeLeft.textContent).toBe('05:00');
    expect(timerLabel.textContent).toBe('Break');

    act(() => {
      jest.advanceTimersByTime(300000);
    });
    expect(timeLeft.textContent).toBe('25:00');
    expect(timerLabel.textContent).toBe('Session');

  });
});
