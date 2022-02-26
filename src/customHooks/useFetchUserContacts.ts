import {useQuery} from 'react-query';
import {Platform} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';
import {useDispatch} from 'react-redux';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import * as types from '../redux/Type';
import {
  FetchUserContactsFailed,
  FetchUserContactsSuccess,
} from '../redux/actions/ContactsAction';

const FetchUserContacts = async (): Promise<Contacts.Contact[]> => {
  let contacts: Contact[];
  let permissionStatus = await request(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.CONTACTS
      : PERMISSIONS.ANDROID.READ_CONTACTS,
  );
  return permissionStatus === RESULTS.GRANTED ? await Contacts.getAll() : [];
};

function compare(a: any, b: any) {
  if (a.displayName < b.displayName) return -1;
  if (a.displayName > b.displayName) return 1;
  return 0;
}
export const useFetchUserContacts = () => {
  const dispatch = useDispatch();
  return useQuery(types.FETCH_CONTACTS_START, FetchUserContacts, {
    staleTime: 30000,
    select: (data: any) => {
      return data.sort(compare).slice(0, 50);
    },
    onSuccess: (contactsList: []) =>
      dispatch(FetchUserContactsSuccess(contactsList)),
    onError: err => dispatch(FetchUserContactsFailed(err)),
  });
};
