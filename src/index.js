import React from 'react';

import './config/ReactotronConfig';

import 'moment/locale/pt-br'
import moment from 'moment-timezone'

import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import SnackBarRedux from "../src/shared/SnackBarRedux";

import store from './store';

import ScreenLoading from './app';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4c88d6',
    accent: "#FFF"
  }
}

console.disableYellowBox = true;

moment.locale('pt-br')

const App = () => (
  <StoreProvider store={store}>
    <PaperProvider theme={theme}>
      <ScreenLoading />
      <SnackBarRedux />
    </PaperProvider>
  </StoreProvider>
);

export default App;
