import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {verticalScale} from '../utils/Scaling';
import colors from '../assets/colors';

const Seperator = () => {
  return <View style={styles.container}></View>;
};

export default React.memo(Seperator);

const styles = StyleSheet.create({
  container: {
    width: '85%',
    alignSelf: 'flex-end',
    height: verticalScale(1.5),
    backgroundColor: colors.LIGHT_GRAY_COLOR,
  },
});
