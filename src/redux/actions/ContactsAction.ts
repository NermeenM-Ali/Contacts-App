import {RNToasty} from 'react-native-toasty';
import {IContact} from '../../screens/MyContacts/MyContactsComponents/ContactsItem';
import * as types from '../Type';

export const FetchUserContactsSuccess = (contactsData: IContact[]) => {
  return (dispatch: any, getState: any) => {
    let favouriteContacts: IContact[] =
      getState().ContactsReducer.favouriteContacts;
    let selectedContacts: IContact[] =
      getState().SelectedContactsReducer.selectedContacts;

    let newContacts: any[];
    favouriteContacts?.map((favItem: IContact) => {
      newContacts = contactsData?.map((item, idx) => {
        if (favItem?.recordID === item?.recordID) {
          return [
            ...contactsData.slice(0, idx),
            ...contactsData.splice(idx, 1, favItem),
            ...contactsData.slice(idx + 1),
          ];
        } else {
          return {...item, isFavourite: false, isSelected: false};
        }
      });
    });

    selectedContacts?.map((selectedItem: IContact) => {
      contactsData?.map((item, idx) => {
        if (selectedItem?.recordID === item?.recordID) {
          return [
            ...contactsData.slice(0, idx),
            ...contactsData.splice(idx, 1, selectedItem),
            ...contactsData.slice(idx + 1),
          ];
        } else {
          return item;
        }
      });
    });

    dispatch({
      type: types.FETCH_CONTACTS_SUCCESS,
      payload: contactsData,
    });
  };
};

export const FetchUserContactsFailed = (err: any) => {
  return (dispatch: any) => {
    dispatch({type: types.FETCH_CONTACTS_FAILED});
    RNToasty.Error({title: JSON.stringify(err)});
  };
};

export const changeContactsProps = (prop: any, value: any) => {
  return (dispatch: any) => {
    dispatch({
      type: types.CHANGE_CONTACTS_PROPS,
      prop,
      value,
    });
  };
};

export const applyContactsSearch = (searchVal: any) => {
  return (dispatch: any, getState: any) => {
    let data = [];
    let filteredName = searchVal ? searchVal.toLowerCase() : null;
    let {userContacts, userContactsBackUp} = getState().ContactsReducer;
    if (filteredName) {
      data = userContacts.filter((item: IContact) =>
        item.displayName.toLowerCase().match(filteredName),
      );
      if (data) {
        data = userContactsBackUp?.filter((item: IContact) =>
          item.displayName.toLowerCase().match(filteredName),
        );
        dispatch(changeContactsProps('userContacts', data));
      } else if (!data?.length && filteredName) {
        data = userContactsBackUp?.filter((item: IContact) =>
          item.displayName.toLowerCase().match(filteredName),
        );
        dispatch(changeContactsProps('userContacts', data));
      }
    } else {
      dispatch(changeContactsProps('userContacts', userContactsBackUp));
    }
  };
};
