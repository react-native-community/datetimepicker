/**
 * @format
 * @flow strict-local
 */
import {
  MODE_DATE,
  MODE_TIME,
  DISPLAY_DEFAULT,
  DATE_SET_ACTION,
  TIME_SET_ACTION,
  DISMISS_ACTION,
  NEUTRAL_BUTTON_ACTION,
  DISPLAY,
  ANDROID_MODE,
} from './constants';
import pickers from './picker';
import invariant from 'invariant';

import type {AndroidEvent, AndroidNativeProps} from './types';

function validateProps(props: AndroidNativeProps) {
  const {mode, value, display} = props;
  invariant(value, 'A date or time should be specified as `value`.');
  invariant(
    !(display === DISPLAY.calendar && mode === ANDROID_MODE.time) &&
      !(display === DISPLAY.clock && mode === ANDROID_MODE.date),
    `display: ${display} and mode: ${mode} cannot be used together.`,
  );
}

export default function RNDateTimePicker(props: AndroidNativeProps) {
  validateProps(props);
  const {
    mode,
    value,
    display,
    onChange,
    is24Hour,
    minimumDate,
    maximumDate,
    neutralButtonLabel,
    minuteInterval,
    locale,
    positiveButtonLabel,
    negativeButtonLabel,
  } = props;
  let picker;

  switch (mode) {
    case MODE_TIME:
      picker = pickers[MODE_TIME].open({
        value,
        display,
        minuteInterval,
        is24Hour,
        neutralButtonLabel,
        locale,
        positiveButtonLabel,
        negativeButtonLabel,
      });
      break;

    case MODE_DATE:
    default:
      picker = pickers[MODE_DATE].open({
        value,
        display,
        minimumDate,
        maximumDate,
        neutralButtonLabel,
        locale,
        positiveButtonLabel,
        negativeButtonLabel,
      });
      break;
  }

  picker.then(
    function resolve({action, day, month, year, minute, hour}) {
      const date = new Date(value);
      const event: AndroidEvent = {
        type: 'set',
        nativeEvent: {},
      };

      switch (action) {
        case DATE_SET_ACTION:
          event.nativeEvent.timestamp = date.setFullYear(year, month, day);
          onChange(event, date);
          break;

        case TIME_SET_ACTION:
          event.nativeEvent.timestamp = date.setHours(hour, minute);
          onChange(event, date);
          break;

        case NEUTRAL_BUTTON_ACTION:
          event.type = 'neutralButtonPressed';
          onChange(event);
          break;

        case DISMISS_ACTION:
        default:
          event.type = 'dismissed';
          onChange(event);
          break;
      }
    },
    function reject(error) {
      // ignore or throw `activity == null` error
      throw error;
    },
  );

  return null;
}

RNDateTimePicker.defaultProps = {
  display: DISPLAY_DEFAULT,
  mode: MODE_DATE,
};
