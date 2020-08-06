import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Platform,
  TextInput,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React, {useState} from 'react';
import {Picker} from 'react-native-windows';
import moment from 'moment';
import {DAY_OF_WEEK} from '../src/constants';

const ThemedText = (props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const textColorByMode = {color: isDarkMode ? Colors.white : Colors.black};

  const TextElement = React.createElement(Text, props);
  return React.cloneElement(TextElement, {
    style: [props.style, textColorByMode],
  });
};

export const App = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [time, setTime] = useState(undefined);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [color, setColor] = useState();
  const [display, setDisplay] = useState('default');
  const [interval, setMinInterval] = useState(undefined);
  const [minuteInterval, setMinuteInterval] = useState(1);

  // Windows-specific
  const maxDate = useState(new Date('2021'));
  const minDate = useState(new Date('2018'));
  const [is24Hours, set24Hours] = useState(false);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(DAY_OF_WEEK.Monday);
  const [dateFormat, setDateFormat] = useState('longdate');
  const [dayOfWeekFormat, setDayOfWeekFormat] = useState(
    '{dayofweek.abbreviated(2)}',
  );

  const handleResetPress = () => {
    setDate(undefined);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onTimeChange = (event: any, newTime?: Date) => {
    if (Platform.OS === 'windows') {
      setTime(newTime);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    setDisplay('default');
  };

  const showDatepickerSpinner = () => {
    showMode('date');
    setDisplay('spinner');
  };

  const showTimepicker = () => {
    showMode('time');
    setDisplay('default');
  };

  const showTimepickerSpinner = () => {
    showMode('time');
    setDisplay('spinner');
  };

  const showTimepickerClockModeWithInterval = () => {
    showMode('time');
    setMinInterval(5);
    setDisplay('clock');
  };

  const showTimepickerSpinnerWithInterval = () => {
    showMode('time');
    setMinInterval(5);
    setDisplay('spinner');
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.lighter,
  };

  if (Platform.OS !== 'windows') {
    return (
      <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          {global.HermesInternal != null && (
            <View style={styles.engine}>
              <Text testID="hermesIndicator" style={styles.footer}>
                Engine: Hermes
              </Text>
            </View>
          )}
          <View
            testID="appRootView"
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <View style={styles.header}>
              <ThemedText style={styles.text}>
                Example DateTime Picker
              </ThemedText>
            </View>
            <View style={styles.header}>
              <ThemedText style={{margin: 10, flex: 1}}>
                text color (iOS only)
              </ThemedText>
              <TextInput
                value={color}
                style={{height: 60, flex: 1}}
                onChangeText={(text) => {
                  setColor(text.toLowerCase());
                }}
                placeholder="color"
              />
            </View>
            <View style={styles.button}>
              <Button
                testID="datePickerButton"
                onPress={showDatepicker}
                title="Show date picker default!"
              />
            </View>
            <View style={styles.button}>
              <Button
                testID="datePickerButtonSpinner"
                onPress={showDatepickerSpinner}
                title="Show date picker spinner!"
              />
            </View>
            <View style={styles.button}>
              <Button
                testID="timePickerButton"
                onPress={showTimepicker}
                title="Show time picker!"
              />
            </View>
            <View style={styles.button}>
              <Button
                testID="timePickerButtonSpinner"
                onPress={showTimepickerSpinner}
                title="Show time picker spinner!"
              />
            </View>
            <View style={styles.button}>
              <Button
                testID="timePickerDefaultIntervalButton"
                onPress={showTimepickerClockModeWithInterval}
                title="Show time picker as clock (with 5 min interval)!"
              />
            </View>
            <View style={styles.button}>
              <Button
                testID="timePickerSpinnerIntervalButton"
                onPress={showTimepickerSpinnerWithInterval}
                title="Show time picker as spinner (with 5 min interval)!"
              />
            </View>
            <View style={styles.header}>
              <ThemedText testID="dateText" style={styles.dateTimeText}>
                {moment.utc(date).format('MM/DD/YYYY')}
              </ThemedText>
              <Text> </Text>
              <ThemedText testID="timeText" style={styles.dateTimeText}>
                {moment.utc(date).format('HH:mm')}
              </ThemedText>
              <Button
                testID="hidePicker"
                onPress={() => setShow(false)}
                title="hide picker"
              />
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                minuteInterval={interval}
                value={date}
                mode={mode}
                is24Hour
                display={display}
                onChange={onChange}
                style={styles.iOsPicker}
                textColor={color || undefined}
                // locale="es-ES"
                // negativeButtonLabel={'No'}
                // positiveButtonLabel={'Si'}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {global.HermesInternal !== null && (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View testID="appRootView" style={styles.containerWindows}>
                <View style={styles.header}>
                  <Text style={styles.text}>Example DateTime Picker</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{padding: 10}}>Date format: </Text>
                  <Picker
                    style={{width: 200, height: 35}}
                    selectedValue={dateFormat}
                    onValueChange={(value) => setDateFormat(value)}>
                    <Picker.Item
                      label="day month year"
                      value="day month year"
                    />
                    <Picker.Item
                      label="dayofweek day month"
                      value="dayofweek day month"
                    />
                    <Picker.Item label="longdate" value="longdate" />
                    <Picker.Item label="shortdate" value="shortdate" />
                  </Picker>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{padding: 10}}>Day of week format: </Text>
                  <Picker
                    style={{width: 200, height: 35}}
                    selectedValue={dayOfWeekFormat}
                    onValueChange={(value) => setDayOfWeekFormat(value)}>
                    <Picker.Item
                      label="abbreviated(2)"
                      value="{dayofweek.abbreviated(2)}"
                    />
                    <Picker.Item
                      label="abbreviated(3)"
                      value="{dayofweek.abbreviated(3)}"
                    />
                    <Picker.Item label="full" value="{dayofweek.full}" />
                  </Picker>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{padding: 10}}>First day of week: </Text>
                  <Picker
                    style={{width: 200, height: 35}}
                    selectedValue={firstDayOfWeek}
                    onValueChange={(value) => setFirstDayOfWeek(value)}>
                    <Picker.Item label="Sunday" value={DAY_OF_WEEK.Sunday} />
                    <Picker.Item label="Monday" value={DAY_OF_WEEK.Monday} />
                    <Picker.Item label="Tuesday" value={DAY_OF_WEEK.Tuesday} />
                    <Picker.Item
                      label="Wednesday"
                      value={DAY_OF_WEEK.Wednesday}
                    />
                    <Picker.Item
                      label="Thursday"
                      value={DAY_OF_WEEK.Thursday}
                    />
                    <Picker.Item label="Friday" value={DAY_OF_WEEK.Friday} />
                    <Picker.Item
                      label="Saturday"
                      value={DAY_OF_WEEK.Saturday}
                    />
                  </Picker>
                </View>

                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  onChange={onChange}
                  style={styles.windowsPicker}
                  firstDayOfWeek={firstDayOfWeek}
                  maxDate={maxDate}
                  minDate={minDate}
                  dateFormat={dateFormat}
                  dayOfWeekFormat={dayOfWeekFormat}
                  placeholderText="select date"
                />
                <View style={{width: 200, marginTop: 15}}>
                  <Text testID="dateTimeText" style={styles.dateTimeText}>
                    {date !== undefined
                      ? moment(date).format('MM/DD/YYYY')
                      : moment().format('MM/DD/YYYY')}
                  </Text>
                  <Button
                    style={styles.resetButton}
                    title="Reset calendar"
                    onPress={handleResetPress}
                  />
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={{padding: 10, marginTop: 10}}>
                    Clock format (AM/PM):{' '}
                  </Text>
                  <Picker
                    style={{width: 200, height: 35, marginTop: 10}}
                    selectedValue={is24Hours}
                    onValueChange={(value) => set24Hours(value)}>
                    <Picker.Item label="12-hour clock" value={false} />
                    <Picker.Item label="24-hour clock" value={true} />
                  </Picker>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{padding: 10}}>Minute interval: </Text>
                  <Picker
                    style={{width: 200, height: 35}}
                    selectedValue={minuteInterval}
                    onValueChange={(value) => setMinuteInterval(value)}>
                    <Picker.Item label="1 minute step" value={1} />
                    <Picker.Item label="12 minute step" value={12} />
                    <Picker.Item label="15 minute step" value={15} />
                    <Picker.Item label="17 minute step" value={17} />
                  </Picker>
                </View>
                <DateTimePicker
                  mode="time"
                  value={time}
                  style={{width: 300, opacity: 1, height: 30, marginTop: 50}}
                  onChange={onTimeChange}
                  is24Hour={is24Hours}
                  minuteInterval={minuteInterval}
                />
                <View style={styles.header}>
                  <Text style={styles.dateTimeText}>
                    {time !== undefined ? 'Time changed event response:\n' : ''}
                    {time !== undefined ? time.toUTCString() : ''}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    marginTop: 32,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerWindows: {
    marginTop: 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    marginBottom: 10,
  },
  resetButton: {
    width: 150,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateTimeText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  iOsPicker: {
    flex: 1,
  },
  windowsPicker: {
    flex: 1,
    paddingTop: 10,
    width: 350,
  },
});
