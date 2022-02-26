import {StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../assets/colors';
import AnimatedLottieView from 'lottie-react-native';
import {scale} from '../utils/Scaling';

const Spinner = () => {
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={require('../assets/animations/LoadingWhite.json')}
        loop
        autoPlay
        autoSize
        speed={0.8}
        style={{width: scale(50)}}
      />
    </View>
  );
};

export default React.memo(Spinner);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
