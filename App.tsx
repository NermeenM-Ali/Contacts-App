import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import MainNavigation from './src/navigation/mainNavigation';
import {QueryClient, QueryClientProvider} from 'react-query';
import {store, persistedStore} from './src/redux/Configration';
import {PersistGate} from 'redux-persist/integration/react';
import colors from './src/assets/colors';

const querClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <QueryClientProvider client={querClient}>
          <View style={styles.container}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={colors.MAIN_COLOR}
            />
            <MainNavigation />
          </View>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
