import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
import colors from '../../../assets/colors';
import Fonts from '../../../assets/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {toggleFavouriteContact} from '../../../redux/actions/FavouriteContactsAction';
import {Contact} from 'react-native-contacts';
import {
  addToSelectedContacts,
  removeSelectedContacts,
} from '../../../redux/actions/SelectedContactsAction';

export interface IContact extends Contact {
  isFavourite: boolean;
  isSelected: boolean;
}
interface IContactsItem {
  item: IContact;
  isFavouriteContacts: boolean;
}
const ContactsItem = (props: IContactsItem) => {
  const dispatch = useDispatch();
  const {item, isFavouriteContacts} = props;
  const {
    displayName,
    thumbnailPath,
    note,
    isFavourite,
    isSelected,
    phoneNumbers,
  } = item;

  const toggleFavContact = () => {
    dispatch(toggleFavouriteContact(item));
  };
  return (
    <TouchableOpacity
      onLongPress={() =>
        !isFavouriteContacts
          ? dispatch(addToSelectedContacts({...item, isSelected: true}))
          : null
      }
      onPress={() =>
        !isFavouriteContacts && isSelected
          ? dispatch(removeSelectedContacts({...item, isSelected: false}))
          : Linking.openURL(`tel: ${phoneNumbers[0].number}`)
      }
      activeOpacity={0.5}
      style={styles.container}>
      {!isSelected ? (
        <>
          {thumbnailPath ? (
            <View style={styles.imgContainer}>
              <Image style={styles.img} source={{uri: thumbnailPath}} />
            </View>
          ) : (
            <View style={styles.charContainer}>
              <Text style={styles.charTxt}>{displayName?.charAt(0)}</Text>
            </View>
          )}
        </>
      ) : isSelected ? (
        <>
          {thumbnailPath ? (
            <View style={styles.imgContainer}>
              <Image style={styles.img} source={{uri: thumbnailPath}} />
            </View>
          ) : (
            <View style={styles.checkContainer}>
              <Ionicons name="checkmark" style={styles.checkIcon} />
            </View>
          )}
        </>
      ) : null}
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactName} numberOfLines={1}>
          {displayName}
        </Text>
        <Text style={styles.contactsNote} numberOfLines={1}>
          {note || 'Available'}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => toggleFavContact()}
        style={styles.favIconBtn}>
        <Ionicons
          name="ios-star"
          style={[
            styles.favIconStyle,
            {
              color: isFavourite ? colors.GOLD_COLOR : colors.LIGHT_GRAY_COLOR,
            },
          ]}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ContactsItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: verticalScale(15),
    backgroundColor: colors.SECONDARY_COLOR,
    flexDirection: 'row',
    paddingHorizontal: scale(10),
  },
  charContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(0.5),
    borderColor: colors.LIGHT_GRAY_COLOR,
  },
  charTxt: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR_FONT_EN,
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginTop: verticalScale(5),
  },
  imgContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  contactInfoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: scale(10),
    width: scale(270),
  },
  contactName: {
    color: colors.WHITE_COLOR,
    fontFamily: Fonts.REGULAR_FONT_EN,
    fontSize: moderateScale(16),
  },
  contactsNote: {
    fontFamily: Fonts.REGULAR_FONT_EN,
    fontSize: moderateScale(12),
    color: colors.MID_GRAY,
  },
  favIconStyle: {
    fontSize: moderateScale(22),
    color: colors.LIGHT_GRAY_COLOR,
  },
  favIconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: moderateScale(25),
    color: colors.SHADOW_COLOR,
  },
  checkContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(0.7),
    borderColor: colors.SHADOW_COLOR,
    elevation: 1,
    backgroundColor: colors.ORANGE_COLOR,
  },
});
