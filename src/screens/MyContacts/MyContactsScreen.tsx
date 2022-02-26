import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {useFetchUserContacts} from '../../customHooks/useFetchUserContacts';
import colors from '../../assets/colors';
import ContactsItem from './MyContactsComponents/ContactsItem';
import Spinner from '../../components/Spinner';
import Seperator from '../../components/Seperator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/Configration';
import Header from '../../components/Header';
import EmptyPage from '../../components/EmptyPage';
import SelectedContactsItem from './MyContactsComponents/SelectedContactsItem';
import {scale, verticalScale} from '../../utils/Scaling';

const userContactsSelectorFunction = (state: RootState) =>
  state.ContactsReducer.userContacts;

const selectedContactsSelectorFunction = (state: RootState) => {
  // @ts-ignore
  return state.SelectedContactsReducer.selectedContacts;
};

const userInfoSelectorFunction = (state: RootState) =>
  state.AuthReducer.userInfo;

const MyContactsScreen = () => {
  const {isLoading, isError} = useFetchUserContacts();
  const userContacts = useSelector(userContactsSelectorFunction);
  const selectedContacts = useSelector(selectedContactsSelectorFunction);
  const userInfo = useSelector(userInfoSelectorFunction);

  const renderContactsList = () => {
    return (
      <FlatList
        data={userContacts}
        keyExtractor={(_, idx) => idx.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.userContactsContainer}
        renderItem={({item}) => (
          <ContactsItem item={item} isFavouriteContacts={false} />
        )}
        ItemSeparatorComponent={() => <Seperator />}
      />
    );
  };

  const renderSelectedContactsSection = () => {
    return (
      <View style={styles.selectedContactsContainer}>
        <FlatList
          data={selectedContacts}
          horizontal
          keyExtractor={(_, idx) => idx.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <SelectedContactsItem item={item} />}
        />
      </View>
    );
  };

  const renderEmptyView = (msg: string | any) => {
    return <EmptyPage msg={msg} />;
  };

  if (isError) {
    // @ts-ignore
    return renderEmptyView(error.message);
  }
  return (
    <View style={styles.container}>
      <Header headerTitle="Contacts" isForFavouriteContacts={false} />
      {selectedContacts.length ? renderSelectedContactsSection() : null}
      {isLoading ? (
        <Spinner />
      ) : userContacts?.length && !isLoading ? (
        renderContactsList()
      ) : (
        renderEmptyView('No Contacts Exist')
      )}
    </View>
  );
};

export default MyContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY_COLOR,
  },
  selectedContactsContainer: {
    width: '100%',
    paddingVertical: verticalScale(15),
    borderBottomColor: colors.ORANGE_COLOR,
    borderBottomWidth: scale(0.5),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
  userContactsContainer: {
    marginTop: verticalScale(15),
  },
});
