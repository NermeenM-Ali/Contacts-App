import {IContact} from '../../screens/MyContacts/MyContactsComponents/ContactsItem';
import {changeContactsProps} from './ContactsAction';

export const toggleFavouriteContact = (contact: IContact) => {
  return (dispatch: any, getState: any) => {
    let {userContacts} = getState().ContactsReducer;
    let newContacts = userContacts.map((itemContact: IContact) => {
      if (itemContact.recordID === contact.recordID) {
        return {...contact, isFavourite: contact.isFavourite ? false : true};
      }
      return itemContact;
    });
    let favContacts = newContacts.filter(
      (contact: IContact) => contact.isFavourite,
    );
    dispatch(changeContactsProps('favouriteContacts', favContacts));
    dispatch(changeContactsProps('userContacts', newContacts));
    dispatch(changeContactsProps('favouriteContactsBackUp', favContacts));
  };
};

export const applyFavouriteContactsSearch = (searchVal: any) => {
  return (dispatch: any, getState: any) => {
    let data = [];
    let filteredName = searchVal ? searchVal.toLowerCase() : null;
    let {favouriteContacts, favouriteContactsBackUp} =
      getState().ContactsReducer;
    if (filteredName) {
      data = favouriteContacts.filter((item: IContact) =>
        item.displayName.toLowerCase().match(filteredName),
      );
      if (data) {
        data = favouriteContactsBackUp?.filter((item: IContact) =>
          item.displayName.toLowerCase().match(filteredName),
        );
        dispatch(changeContactsProps('favouriteContacts', data));
      } else if (!data?.length && filteredName) {
        data = favouriteContactsBackUp?.filter((item: IContact) =>
          item.displayName.toLowerCase().match(filteredName),
        );
        dispatch(changeContactsProps('favouriteContacts', data));
      }
    } else {
      dispatch(
        changeContactsProps('favouriteContacts', favouriteContactsBackUp),
      );
    }
  };
};
