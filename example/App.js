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
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import React, {useState} from 'react';
import moment from 'moment';

const App = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [color, setColor] = useState();
  const [display, setDisplay] = useState('default');
  const [interval, setMinInterval] = useState(undefined);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
    setMinInterval(undefined);
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

  const showTimepickerWithInterval = () => {
    showMode('time');
    setDisplay('spinner');
    setMinInterval(5);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal !== null && (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View testID="appRootView" style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.text}>Example DateTime Picker</Text>
              </View>
              <View style={styles.header}>
                <Text style={{margin: 10, flex: 1}}>text color (iOS only)</Text>
                <TextInput
                  value={color}
                  style={{height: 60, flex: 1}}
                  onChangeText={text => {
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
                  testID="timePickerIntervalButton"
                  onPress={showTimepickerWithInterval}
                  title="Show time picker (with 5 min interval)!"
                />
              </View>
              <View style={styles.button}>
                <Button
                  testID="timePickerButtonSpinner"
                  onPress={showTimepickerSpinner}
                  title="Show time picker spinner!"
                />
              </View>
              <View style={styles.header}>
                <Text testID="dateTimeText" style={styles.dateTimeText}>
                  {mode === 'time' && moment.utc(date).format('HH:mm')}
                  {mode === 'date' && moment.utc(date).format('MM/DD/YYYY')}
                </Text>
                <Button
                  testID="hidePicker"
                  onPress={() => setShow(false)}
                  title="hide picker"
                />
              </View>
              {show && (
                <DateTimePicker
                  minuteInterval={interval}
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={date}
                  mode={mode}
                  is24Hour
                  display={display}
                  onChange={onChange}
                  style={styles.iOsPicker}
                  textColor={color || undefined}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
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
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    marginBottom: 10,
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
});

export default App;
