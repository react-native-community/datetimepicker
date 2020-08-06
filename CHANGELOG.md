# CHANGELOG

### 2.7.0

- Add support for 'locale' prop for Android.
- Add 'positiveButtonLabel' and 'negativeButtonLabel' props to pass Android's DateTimePicker dialog buttons.

### 2.6.0

- Add time picker for Windows [#206](https://github.com/react-native-community/datetimepicker/pull/206)

### 2.5.0

- feat: add minute interval on Android [#177](https://github.com/react-native-community/datetimepicker/pull/177)

### 2.4.3

- Fix TS typings [#197](https://github.com/react-native-community/datetimepicker/pull/197)
- document working with dark mode [#204](https://github.com/react-native-community/datetimepicker/pull/204)

### 2.4.2

- Make react-native-windows optional [#191](https://github.com/react-native-community/datetimepicker/pull/191)

### 2.4.1

- allow compiling with xcode 10 [#186](https://github.com/react-native-community/datetimepicker/pull/186)

### 2.4.0

- Add Windows date picker [#157](https://github.com/react-native-community/datetimepicker/pull/157)
- Update Example App to RN 0.62.2 [#146](https://github.com/react-native-community/datetimepicker/pull/146)
- throw when invalid props are passed to android picker [#148](https://github.com/react-native-community/datetimepicker/pull/148)
- Recommend npx pod-install for setup instructions [#159](https://github.com/react-native-community/datetimepicker/pull/159)

### 2.3.2

- Fix android nougat display spinner [#118](https://github.com/react-native-community/datetimepicker/pull/118)

### 2.3.1

- fix typescript compilation errors #138, #143
- use yarn for managing deps (this should not influence consumers)

### 2.3.0

- add `textColor` prop for iOS: [#127](https://github.com/react-native-community/datetimepicker/pull/127)

### 2.2.3

- Fix iOS picker's styling bug where picker would be fixed to 216px height no matter what `style` was applied to the picker. This is because previously, the picker was always wrapped in a `View` which was now removed. Since `style` prop was never documented in this package, we do not consider this a breaking change. Now `style` can correctly apply specific height settings and flex. NOTE: this only works with View style property type. [#120](https://github.com/react-native-community/react-native-datetimepicker/pull/120)
- update readme example code [#124](https://github.com/react-native-community/react-native-datetimepicker/pull/124)

### 2.2.2

- Fix android time picker returning today's date instead of the given date [#115](https://github.com/react-native-community/react-native-datetimepicker/pull/115)

### 2.2.1

- Fix missing return statement [#107](https://github.com/react-native-community/react-native-datetimepicker/pull/107)

### 2.2.0

- Fix podspec to get source from tag [#103](https://github.com/react-native-community/react-native-datetimepicker/pull/103)
- fix prettier usage [#102](https://github.com/react-native-community/react-native-datetimepicker/pull/102)
- Introduce neutral button via neutralButtonLabel on Android pickers [#93](https://github.com/react-native-community/react-native-datetimepicker/pull/93)
- update readme [#100](https://github.com/react-native-community/react-native-datetimepicker/pull/100)

### 2.1.2

- Fix Android Nougat datetime picker mode="spinner" [#47](https://github.com/react-native-community/react-native-datetimepicker/pull/47)

### 2.1.1

- Add `countdown` option to iOSMode types [#31](https://github.com/react-native-community/react-native-datetimepicker/pull/31)
- Added TS type definition file path to package.json [#77](https://github.com/react-native-community/react-native-datetimepicker/pull/77)
- Improved readme [#33](https://github.com/react-native-community/react-native-datetimepicker/pull/33), [#39](https://github.com/react-native-community/react-native-datetimepicker/pull/39), [#46](https://github.com/react-native-community/react-native-datetimepicker/pull/46), [#97](https://github.com/react-native-community/react-native-datetimepicker/pull/97)

### 2.1.0

- [#25] Add typescript definitions.
- [#22] Fix backtick in documentation.

### 2.0.0

- [#13] Update to `react-native@0.60`

### 1.0.0

- [#7] Adding Readme.md and docs
- [#6] Detox tests added
- [#5] Adjust CHANGELOG.md to have links at bottom of markdown
- [#4] Fixing iOS React import and cleaning iOS example project
- [#3] Using @react-native-community/eslint-config

[#3]: https://github.com/react-native-community/react-native-datetimepicker/pull/3
[#4]: https://github.com/react-native-community/react-native-datetimepicker/pull/4
[#5]: https://github.com/react-native-community/react-native-datetimepicker/pull/5
[#6]: https://github.com/react-native-community/react-native-datetimepicker/pull/6
[#7]: https://github.com/react-native-community/react-native-datetimepicker/pull/7
[#13]: https://github.com/react-native-community/react-native-datetimepicker/pull/13
[#22]: https://github.com/react-native-community/react-native-datetimepicker/pull/22
[#25]: https://github.com/react-native-community/react-native-datetimepicker/pull/25
