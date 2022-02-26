import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Seperator from '../../components/Seperator';
import ContactsItem from '../MyContacts/MyContactsComponents/ContactsItem';
import colors from '../../assets/colors';
import EmptyPage from '../../components/EmptyPage';
import {RootState} from '../../redux/Configration';
import Header from '../../components/Header';
import {changeContactsProps} from '../../redux/actions/ContactsAction';

const favContactsSelectorFunction = (state: RootState) =>
  state.ContactsReducer.favouriteContacts;

const FavourateContactsScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const favouriteContacts = useSelector(favContactsSelectorFunction);

  useEffect(() => {
    isFocused && dispatch(changeContactsProps('isFavouriteContacts', true));
  }, []);

  const renderFavouriteContactsList = () => {
    return (
      <FlatList
        data={favouriteContacts}
        keyExtractor={(_, idx) => idx.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ContactsItem item={item} />}
        ItemSeparatorComponent={() => <Seperator />}
      />
    );
  };

  const renderEmptyView = () => {
    return <EmptyPage msg={'No Favourite Contacts Exist'} />;
  };
  return (
    <View style={styles.container}>
      <Header headerTitle="Favourite Contacts" isForFavouriteContacts={true} />
      {favouriteContacts?.length
        ? renderFavouriteContactsList()
        : renderEmptyView()}
    </View>
  );
};

export default FavourateContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY_COLOR,
  },
});
