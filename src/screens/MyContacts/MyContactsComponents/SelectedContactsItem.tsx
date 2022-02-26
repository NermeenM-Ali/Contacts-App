import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IContact} from './ContactsItem';
import colors from '../../../assets/colors';
import Fonts from '../../../assets/Fonts';
import {scale, moderateScale, verticalScale} from '../../../utils/Scaling';
import {removeSelectedContacts} from '../../../redux/actions/SelectedContactsAction';
import {useDispatch} from 'react-redux';

interface ISelectedContactsItem {
  item: IContact;
}
const SelectedContactsItem = (props: ISelectedContactsItem) => {
  const dispatch = useDispatch();
  const {item} = props;
  const {thumbnailPath, displayName} = item;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.removeBtnContainer}
        onPress={() =>
          dispatch(removeSelectedContacts({...item, isSelected: false}))
        }
        activeOpacity={0.8}>
        <Text style={styles.removeIcon}>X</Text>
      </TouchableOpacity>
      {thumbnailPath ? (
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{uri: thumbnailPath}} />
        </View>
      ) : (
        <View style={styles.charContainer}>
          <Text style={styles.charTxt}>{displayName?.charAt(0)}</Text>
        </View>
      )}
      <Text style={styles.contactName} ellipsizeMode="tail" numberOfLines={1}>
        {displayName}
      </Text>
    </View>
  );
};

export default SelectedContactsItem;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: scale(8),
  },
  charContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(0.5),
    borderColor: colors.LIGHT_GRAY_COLOR,
  },
  charTxt: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR_FONT_EN,
    fontSize: moderateScale(18),
    textAlign: 'center',
    marginTop: verticalScale(5),
  },
  imgContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  contactName: {
    width: scale(50),
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR_FONT_EN,
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginTop: verticalScale(5),
  },
  removeIcon: {
    fontFamily: Fonts.REGULAR_FONT_AR,
    fontSize: moderateScale(12),
    color: colors.WHITE_COLOR,
  },
  removeBtnContainer: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: colors.LIGHT_GRAY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: scale(-7),
  },
});
