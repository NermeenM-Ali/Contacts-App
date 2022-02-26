import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import colors from '../../assets/colors';
import {scale, verticalScale} from '../../utils/Scaling';
import AnimatedLottieView from 'lottie-react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {LogOutUser} from '../../redux/actions/AuthAction';

const SplashScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    auth().onAuthStateChanged((user: any) => {
      if (user) {
        setTimeout(() => {
          return navigation.navigate('TabScreen');
        }, 2000);
      } else {
        navigation.navigate('LoginScreen');
        dispatch(LogOutUser(navigation));
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/contacts.png')}
        resizeMode="contain"
        style={styles.img}
      />
      <AnimatedLottieView
        source={require('../../assets/animations/LoadingWhite.json')}
        loop
        autoPlay
        autoSize
        speed={0.8}
        style={{width: scale(50)}}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: scale(250),
    height: verticalScale(300),
  },
});
