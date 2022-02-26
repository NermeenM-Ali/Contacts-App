import {
  createStore,
  applyMiddleware,
  combineReducers,
  CombinedState,
} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistConfig} from 'redux-persist/es/types';
import ContactsReducer from './reducers/ContactsReducer';
import SelectedContactsReducer from './reducers/SelectedContactsReducer';
import AuthReducer from './reducers/AuthReducer';

const RootReducer = combineReducers({
  ContactsReducer,
  SelectedContactsReducer,
  AuthReducer,
});

export type RootState = ReturnType<typeof RootReducer>;

const persistConfig: PersistConfig<CombinedState<any>> = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
};

const persistedReducer = persistReducer<CombinedState<any>>(
  persistConfig,
  RootReducer,
);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistedStore = persistStore(store);
