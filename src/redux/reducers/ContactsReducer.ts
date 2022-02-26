import * as types from '../Type';

const initialState = {
  userContacts: [],
  userContactsBackUp: [],
  favouriteContacts: [],
  favouriteContactsBackUp: [],
  searchResultText: null,
  searchFavouriteResultText: null,
};

const ContactsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        userContacts: action.payload,
        userContactsBackUp: action.payload,
      };
    case types.FETCH_CONTACTS_FAILED:
      return initialState;
    case types.CHANGE_CONTACTS_PROPS:
      return {...state, [action.prop]: action.value};
    default:
      return state;
  }
};

export default ContactsReducer;
