import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Seperator from '../../components/Seperator';
import ContactsItem from '../MyContacts/MyContactsComponents/ContactsItem';
import colors from '../../assets/colors';
import EmptyPage from '../../components/EmptyPage';
import {RootState} from '../../redux/Configration';
import Header from '../../components/Header';

const favContactsSelectorFunction = (state: RootState) =>
  state.ContactsReducer.favouriteContacts;

const FavourateContactsScreen = () => {
  const favouriteContacts = useSelector(favContactsSelectorFunction);
  const renderFavouriteContactsList = () => {
    return (
      <FlatList
        data={favouriteContacts}
        keyExtractor={(_, idx) => idx.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ContactsItem item={item} isFavouriteContacts={true} />
        )}
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
