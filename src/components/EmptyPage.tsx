import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale} from '../utils/Scaling';
import colors from '../assets/colors';
import Fonts from '../assets/Fonts';

interface IEmptyPage {
  msg: string;
}
const EmptyPage = (props: IEmptyPage) => {
  const {msg} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.msgStyle}>{msg}</Text>
    </View>
  );
};

export default EmptyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgStyle: {
    fontSize: moderateScale(16),
    color: colors.SHADOW_COLOR,
    fontFamily: Fonts.REGULAR_FONT_EN,
  },
});
