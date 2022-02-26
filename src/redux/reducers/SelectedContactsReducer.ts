import {IContact} from '../../screens/MyContacts/MyContactsComponents/ContactsItem';
import * as types from '../Type';

const initialState = {
  selectedContacts: [],
};

const SelectedContactsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.ADD_AS_SELECTED_CONTACT:
      return {
        ...state,
        selectedContacts: [...state.selectedContacts, action.payload],
      };

    case types.REMOVE_SELECTED_CONTACT:
      return {
        ...state,
        selectedContacts: state.selectedContacts.filter(
          (contact: IContact) => contact.recordID !== action.payload.recordID,
        ),
      };
    default:
      return state;
  }
};

export default SelectedContactsReducer;
