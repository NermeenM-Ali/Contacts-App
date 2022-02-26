import React from 'react';
import {StyleSheet, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../assets/colors';
import {verticalScale} from '../../utils/Scaling';

const ImgTab = ({tabName, isFocused}: any) => {
  return (
    <View style={styles.container}>
      {tabName === 'MyContactsStack' ? (
        <AntDesign
          name="contacts"
          size={23}
          color={isFocused ? colors.ORANGE_COLOR : colors.WHITE_COLOR}
          style={{alignSelf: 'center'}}
        />
      ) : tabName === 'FavourateContactsStack' ? (
        <IonIcon
          name="ios-star"
          size={21}
          color={isFocused ? colors.ORANGE_COLOR : colors.WHITE_COLOR}
          style={{alignSelf: 'center'}}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(5),
    alignSelf: 'center',
  },
});

export default React.memo(ImgTab);
