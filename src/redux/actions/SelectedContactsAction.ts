import {IContact} from '../../screens/MyContacts/MyContactsComponents/ContactsItem';
import * as types from '../Type';
import {changeContactsProps} from './ContactsAction';

export const addToSelectedContacts = (contact: IContact) => {
  return (dispatch: any, getState: any) => {
    let userContacts: IContact[] | any =
      getState().ContactsReducer.userContacts;
    userContacts = userContacts?.map((item: IContact) => {
      if (contact?.recordID === item?.recordID) {
        return {...item, isSelected: true};
      } else {
        return item;
      }
    });
    dispatch(changeContactsProps('userContacts', userContacts));
    dispatch({
      type: types.ADD_AS_SELECTED_CONTACT,
      payload: contact,
    });
  };
};

export const removeSelectedContacts = (contact: IContact) => {
  return (dispatch: any, getState: any) => {
    let userContacts: IContact[] | any =
      getState().ContactsReducer.userContacts;
    userContacts = userContacts?.map((item: IContact) => {
      if (contact?.recordID === item?.recordID) {
        return {...item, isSelected: false};
      } else {
        return item;
      }
    });
    dispatch(changeContactsProps('userContacts', userContacts));
    dispatch({
      type: types.REMOVE_SELECTED_CONTACT,
      payload: contact,
    });
  };
};
