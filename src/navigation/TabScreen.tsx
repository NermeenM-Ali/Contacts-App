import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MyTabBar from './navigationComponents/TabBarComponent';
import MyContactsScreen from '../screens/MyContacts/MyContactsScreen';
import FavourateContactsScreen from '../screens/FavouriteContacts/FavourateContactsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyContactsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyContactsScreen" component={MyContactsScreen} />
    </Stack.Navigator>
  );
};

const FavourateContactsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="FavourateContactsScreen"
        component={FavourateContactsScreen}
      />
    </Stack.Navigator>
  );
};

const TabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="MyContactsStack"
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
      }}
      tabBar={(props: BottomTabBarProps) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="MyContactsStack"
        component={MyContactsStack}
        options={{tabBarLabel: 'My Contacts'}}
      />

      <Tab.Screen
        name="FavourateContactsStack"
        component={FavourateContactsStack}
        options={{tabBarLabel: 'Favourites'}}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;
