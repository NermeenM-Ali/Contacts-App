import React, {PureComponent} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import colors from '../assets/colors';
import {moderateScale, scale, verticalScale} from '../utils/Scaling';
import Fonts from '../assets/Fonts';

interface OtpInputProps {
  value: any;
  inputRef?: any;
  onChangeText: (any: any) => any;
  onSubmitEditing?: () => any;
}
export default class OtpInput extends PureComponent<OtpInputProps> {
  render() {
    let {value, onChangeText, onSubmitEditing, inputRef} = this.props;
    return (
      <TextInput
        ref={inputRef}
        style={styles.v_code}
        keyboardType={'number-pad'}
        returnKeyType="done"
        returnKeyLabel="Done"
        maxLength={1}
        placeholder="*"
        placeholderTextColor={colors.DARK_GRAY}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    );
  }
}

const styles = StyleSheet.create({
  v_code: {
    width: scale(30),
    paddingVertical: verticalScale(5),
    backgroundColor: colors.WHITE_COLOR,
    color: colors.MAIN_COLOR,
    marginHorizontal: scale(7),
    borderBottomWidth: scale(2),
    borderBottomColor: colors.LIGHT_GRAY_COLOR,
    textAlign: 'center',
    fontFamily: Fonts.REGULAR_FONT_EN,
    fontSize: moderateScale(15),
    alignSelf: 'center',
  },
});
