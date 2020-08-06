/**
 * @format
 * @flow strict-local
 */
export const MODE_DATE = 'date';
export const MODE_TIME = 'time';
export const MODE_DATETIME = 'datetime';

export const DISPLAY_DEFAULT = 'default';
export const DISPLAY_SPINNER = 'spinner';
export const DISPLAY_CLOCK = 'clock';
export const DISPLAY_CALENDAR = 'calendar';

// TODO vonovak potentially replace the above string consts with this object
export const DISPLAY = Object.freeze({
  spinner: 'spinner',
  default: 'default',
  clock: 'clock',
  calendar: 'calendar',
});

export const ANDROID_MODE = Object.freeze({
  date: 'date',
  time: 'time',
});

export const DAY_OF_WEEK = Object.freeze({
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
});

export const DATE_SET_ACTION = 'dateSetAction';
export const TIME_SET_ACTION = 'timeSetAction';
export const DISMISS_ACTION = 'dismissedAction';

export const NEUTRAL_BUTTON_LABEL = 'neutralButtonLabel';
export const NEUTRAL_BUTTON_ACTION = 'neutralButtonAction';

export const POSITIVE_BUTTON_LABEL = 'positiveButtonLabel';
export const NEGATIVE_BUTTON_LABEL = 'negativeButtonLabel';

export const LOCALE = 'locale';
