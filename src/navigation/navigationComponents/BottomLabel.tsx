import React from 'react';
import {I18nManager, StyleSheet, Text} from 'react-native';
import colors from '../../assets/colors';
import Fonts from '../../assets/Fonts';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';

interface IBottomLabel {
  label: string;
  isFocused: boolean;
}

const BottomLabel = (props: IBottomLabel) => {
  const {label, isFocused} = props;
  return (
    <Text
      style={[
        styles.txt,
        {color: isFocused ? colors.ORANGE_COLOR : colors.WHITE_COLOR},
      ]}>
      {' '}
      {label}{' '}
    </Text>
  );
};

export default React.memo(BottomLabel);

const styles = StyleSheet.create({
  txt: {
    color: colors.WHITE_COLOR,
    fontSize: moderateScale(13),
    alignSelf: 'center',
    textAlign: 'center',
    maxWidth: scale(125),
    fontFamily: I18nManager.isRTL
      ? Fonts.REGULAR_FONT_EN
      : Fonts.REGULAR_FONT_EN,
    paddingTop: verticalScale(5),
  },
});
