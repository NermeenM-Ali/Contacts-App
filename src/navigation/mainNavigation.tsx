import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/Intro/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import TabScreen from './TabScreen';
import LoginWithPhoneNumberScreen from '../screens/Auth/LoginWithPhoneNumberScreen';

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Screen name="TabScreen" component={TabScreen} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="LoginWithPhoneNumberScreen"
          component={LoginWithPhoneNumberScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
