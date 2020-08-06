import {FC, Ref, SyntheticEvent} from 'react';
import {NativeMethods, ViewProps} from 'react-native';

type IOSMode = 'date' | 'time' | 'datetime' | 'countdown';
type AndroidMode = 'date' | 'time';
type Display = 'spinner' | 'default' | 'clock' | 'calendar';
type MinuteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;

export type Event = SyntheticEvent<
  Readonly<{
    timestamp: number;
  }>
>;

export type AndroidEvent = {
  type: string;
  nativeEvent: {
    timestamp?: number;
  };
};

type BaseOptions = {
  /**
   * The currently selected date.
   */
  value: Date;

  /**
   * Date change handler.
   *
   * This is called when the user changes the date or time in the UI.
   * The first argument is an Event, the second a selected Date.
   */
  onChange?: (event: Event, date?: Date) => void;
};

type DateOptions = BaseOptions & {
  /**
   * Maximum date.
   *
   * Restricts the range of possible date/time values.
   */
  maximumDate?: Date;

  /**
   * Minimum date.
   *
   * Restricts the range of possible date/time values.
   */
  minimumDate?: Date;
};

type TimeOptions = Readonly<
  BaseOptions & {
    /**
     * Display TimePicker in 24 hour.
     */
    is24Hour?: boolean;
  }
>;

export type BaseProps = Readonly<ViewProps & DateOptions>;

export type IOSNativeProps = Readonly<
  BaseProps & {
    date?: Date;

    /**
     * The date picker locale.
     */
    locale?: string;

    /**
     * The interval at which minutes can be selected.
     */
    minuteInterval?: MinuteInterval;

    /**
     * The date picker mode.
     */
    mode?: IOSMode;

    /**
     * Timezone offset in minutes.
     *
     * By default, the date picker will use the device's timezone. With this
     * parameter, it is possible to force a certain timezone offset. For
     * instance, to show times in Pacific Standard Time, pass -7 * 60.
     */
    timeZoneOffsetInMinutes?: number;

    /**
     * The date picker text color.
     */
    textColor?: string;
  }
>;

export type AndroidNativeProps = Readonly<
  BaseProps &
    DateOptions &
    TimeOptions & {
      /**
       * The date picker mode.
       */
      mode?: AndroidMode;

      /**
       * The display options.
       */
      display?: Display;

      /**
       * The interval at which minutes can be selected.
       */
      minuteInterval?: MinuteInterval;

      onChange?: (event: AndroidEvent, date?: Date) => void;
      neutralButtonLabel?: string;
      positiveButtonLabel?: string;
      negativeButtonLabel?: string;
    }
>;

export type DatePickerOptions = DateOptions & {
  display?: Display;
};

export type TimePickerOptions = TimeOptions & {
  display?: Display;
};

export type DateTimePickerResult = Readonly<{
  action: ('timeSetAction' | 'dateSetAction' | 'dismissedAction') | null;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}>;

export type RCTDateTimePickerNative = NativeMethods;
export type NativeRef = {
  current: Ref<RCTDateTimePickerNative> | null;
};

declare const RNDateTimePicker: FC<IOSNativeProps | AndroidNativeProps>;

export default RNDateTimePicker;
