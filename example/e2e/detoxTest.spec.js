const {getTimeText, getDateText} = require('./utils/matchers');

async function userChangesMinuteValue() {
  const keyboardIconButton = element(
    by.type('androidx.appcompat.widget.AppCompatImageButton'),
  );

  await keyboardIconButton.tap();

  const minuteTextinput = element(
    by.type('androidx.appcompat.widget.AppCompatEditText'),
  ).atIndex(1);

  await minuteTextinput.replaceText('30');
}

async function userOpensPicker({mode, display, interval}) {
  await element(by.text(mode)).tap();
  await element(by.text(display)).tap();
  if (interval) {
    await element(by.text(String(interval))).tap();
  }
  await element(by.id('showPickerButton')).tap();
}

async function userTapsCancelButtonAndroid() {
  // selecting element by text does not work consistently :/
  const cancelButton = element(by.text('Cancel'));
  // const cancelButton = element(
  //   by
  //     .type('androidx.appcompat.widget.AppCompatButton')
  //     .withAncestor(by.type('android.widget.ScrollView')),
  // ).atIndex(0);
  await cancelButton.tap();
}
async function userTapsOkButtonAndroid() {
  // selecting element by text does not work consistently :/
  const okButton = element(by.text('OK'));
  // const okButton = element(
  //   by
  //     .type('androidx.appcompat.widget.AppCompatButton')
  //     .withAncestor(by.type('android.widget.ScrollView')),
  // ).atIndex(1);
  await okButton.tap();
}

describe('Example', () => {
  beforeEach(async () => {
    if (global.device.getPlatform() === 'ios') {
      await device.reloadReactNative();
    } else {
      await device.launchApp({newInstance: true});
    }
    await waitFor(element(by.text('Example DateTime Picker')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should have title and hermes indicator on android', async () => {
    await expect(element(by.text('Example DateTime Picker'))).toBeVisible();
    if (device.getPlatform() === 'android') {
      await expect(element(by.id('hermesIndicator'))).toExist();
    }
  });

  it('should show date picker after tapping datePicker button', async () => {
    await userOpensPicker({mode: 'date', display: 'default'});

    if (global.device.getPlatform() === 'ios') {
      await expect(
        element(by.type('UIPickerView').withAncestor(by.id('dateTimePicker'))),
      ).toBeVisible();
    } else {
      await expect(element(by.type('android.widget.DatePicker'))).toBeVisible();
    }
  });

  it('Nothing should happen if date does not change', async () => {
    await userOpensPicker({mode: 'date', display: 'default'});

    if (global.device.getPlatform() === 'ios') {
      await expect(
        element(by.type('UIPickerView').withAncestor(by.id('dateTimePicker'))),
      ).toBeVisible();
    } else {
      const testElement = element(
        by
          .type('android.widget.ScrollView')
          .withAncestor(by.type('android.widget.DatePicker')),
      );
      await testElement.swipe('left', 'fast', '100');
      await testElement.tapAtPoint({x: 50, y: 200});
      await userTapsCancelButtonAndroid();
    }

    const dateText = getDateText();
    await expect(dateText).toHaveText('08/21/2020');
  });

  it('should update dateTimeText when date changes', async () => {
    await userOpensPicker({mode: 'date', display: 'default'});
    const dateText = getDateText();

    if (global.device.getPlatform() === 'ios') {
      const testElement = element(
        by.type('UIPickerView').withAncestor(by.id('dateTimePicker')),
      );
      await testElement.setColumnToValue(0, 'November');
      await testElement.setColumnToValue(1, '3');
      await testElement.setColumnToValue(2, '1800');

      await expect(dateText).toHaveText('11/03/1800');
    } else {
      const testElement = element(
        by
          .type('android.widget.ScrollView')
          .withAncestor(by.type('android.widget.DatePicker')),
      );
      await testElement.swipe('left', 'fast', '100');
      await testElement.tapAtPoint({x: 50, y: 200});
      await userTapsOkButtonAndroid();

      await expect(dateText).toHaveText('09/13/2020');
    }
  });

  it('should show time picker after tapping timePicker button', async () => {
    await userOpensPicker({mode: 'time', display: 'default'});

    if (global.device.getPlatform() === 'ios') {
      await expect(
        element(by.type('UIPickerView').withAncestor(by.id('dateTimePicker'))),
      ).toBeVisible();
    } else {
      await expect(element(by.type('android.widget.TimePicker'))).toBeVisible();
    }
  });

  it('Nothing should happen if time does not change', async () => {
    await userOpensPicker({mode: 'time', display: 'default'});

    if (global.device.getPlatform() === 'ios') {
      await expect(
        element(by.type('UIPickerView').withAncestor(by.id('dateTimePicker'))),
      ).toBeVisible();
    } else {
      await userChangesMinuteValue();
      await userTapsCancelButtonAndroid();
    }
    const timeText = getTimeText();
    await expect(timeText).toHaveText('23:15');
  });

  it('should change time text when time changes', async () => {
    await userOpensPicker({mode: 'time', display: 'default'});
    const timeText = getTimeText();

    if (global.device.getPlatform() === 'ios') {
      const testElement = element(
        by.type('UIPickerView').withAncestor(by.id('dateTimePicker')),
      );
      await testElement.setColumnToValue(0, '2');
      await testElement.setColumnToValue(1, '44');
      await testElement.setColumnToValue(2, 'PM');

      await expect(timeText).toHaveText('14:44');
    } else {
      await userChangesMinuteValue();
      await userTapsOkButtonAndroid();

      await expect(timeText).toHaveText('23:30');
    }
  });

  describe('given 5-minute interval', () => {
    it(':android: clock picker should correct 18-minute selection to 20-minute one', async () => {
      try {
        await userOpensPicker({mode: 'time', display: 'clock', interval: 5});

        const keyboardButton = element(
          by.type('androidx.appcompat.widget.AppCompatImageButton'),
        );
        await keyboardButton.tap();
        const testElement = element(
          by.type('androidx.appcompat.widget.AppCompatEditText'),
        ).atIndex(1);
        await testElement.tap();
        await testElement.replaceText('18');
        await userTapsOkButtonAndroid();

        const timeText = getTimeText();
        await expect(timeText).toHaveText('23:20');
      } catch (err) {
        console.error(err);
      }
    });

    it(':android: given picker is shown as a spinner, swiping it down changes selected time', async () => {
      try {
        const timeText = getTimeText();

        await expect(timeText).toHaveText('23:15');

        await userOpensPicker({mode: 'time', display: 'spinner', interval: 5});

        const minutePicker = element(
          by.type('android.widget.NumberPicker'),
        ).atIndex(1);
        await minutePicker.swipe('up', 'slow', '33');
        await userTapsOkButtonAndroid();

        await expect(timeText).toHaveText('23:25');
      } catch (err) {
        console.error(err);
      }
    });

    it(':ios: picker should offer only options divisible by 5 (0, 5, 10,...)', async () => {
      await userOpensPicker({mode: 'time', display: 'spinner', interval: 5});

      const testElement = element(
        by.type('UIPickerView').withAncestor(by.id('dateTimePicker')),
      );
      await testElement.setColumnToValue(0, '2');
      await testElement.setColumnToValue(2, 'PM');
      const timeText = getTimeText();

      await expect(timeText).toHaveText('14:15');

      const valueThatShouldNotBePresented = '18';
      try {
        await testElement.setColumnToValue(1, valueThatShouldNotBePresented);
      } catch (err) {
        if (
          err.message.includes('UIPickerView does not contain desired value')
        ) {
          await testElement.setColumnToValue(1, '45');
        } else {
          throw new Error(
            'because time interval of 5 minutes was set, Picker should not contain value ' +
              valueThatShouldNotBePresented +
              ' but it was displayed in the list.',
          );
        }
      }

      await expect(timeText).toHaveText('14:45');
    });
  });
});
