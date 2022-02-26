import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../assets/colors';
import {scale, verticalScale} from '../../utils/Scaling';
import BottomLabel from './BottomLabel';
import ImgTab from './ImgTab';

function MyTabBar(props: BottomTabBarProps) {
  const {state, descriptors, navigation} = props;

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const TabIcon = () => options.tabBarIcon;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <ImgTab tabName={route.name} isFocused={isFocused} />
            <BottomLabel label={label} isFocused={isFocused} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.MAIN_COLOR,
    height: verticalScale(75),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: colors.ORANGE_COLOR,
    borderTopWidth: scale(0.5),
    elevation: 10,
  },
});
export default React.memo(MyTabBar);
