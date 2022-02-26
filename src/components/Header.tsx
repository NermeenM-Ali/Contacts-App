import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import colors from '../assets/colors';
import Fonts from '../assets/Fonts';
import {LogOutUser} from '../redux/actions/AuthAction';
import {applyContactsSearch} from '../redux/actions/ContactsAction';
import {applyFavouriteContactsSearch} from '../redux/actions/FavouriteContactsAction';
import {moderateScale, scale, verticalScale} from '../utils/Scaling';
import SearchInput from './SearchInput';

interface IHeaderProps {
  headerTitle: string;
  isForFavouriteContacts: boolean;
}
const Header = (props: IHeaderProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchVal, setSearchVal] = useState<any>(null);
  let {headerTitle, isForFavouriteContacts} = props;

  const handleLogOut = () => dispatch(LogOutUser(navigation));
  return (
    <View style={styles.headerContainer}>
      <StatusBar barStyle="light-content" backgroundColor={colors.MAIN_COLOR} />
      <TouchableOpacity
        style={styles.logOutButton}
        activeOpacity={0.8}
        onPress={handleLogOut}>
        <AntDesign
          name="logout"
          size={22}
          color={colors.WHITE_COLOR}
          style={{transform: [{rotateY: '180deg'}]}}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{headerTitle}</Text>
      <SearchInput
        placeHolder={'Search..'}
        value={searchVal}
        onChangeText={(val: any) => {
          setSearchVal(val);
          isForFavouriteContacts
            ? dispatch(applyFavouriteContactsSearch(val))
            : dispatch(applyContactsSearch(val));
        }}
        onSubmitEditing={() =>
          isForFavouriteContacts
            ? dispatch(applyFavouriteContactsSearch(searchVal))
            : dispatch(applyContactsSearch(searchVal))
        }
      />
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: verticalScale(150),
    backgroundColor: colors.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(20),
    borderBottomColor: colors.ORANGE_COLOR,
    borderBottomWidth: scale(1),
  },
  headerTitle: {
    fontFamily: Fonts.BOLD_FONT_EN,
    fontSize: moderateScale(20),
    color: colors.SHADOW_COLOR,
  },
  logOutButton: {
    position: 'absolute',
    left: scale(20),
    top: verticalScale(33),
  },
});
