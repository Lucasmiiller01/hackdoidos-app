import React from 'react';

import { Text } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import MainScreen from './pages/Main';
import ProfileScreen from './pages/Profile';
import ReportsScreen from './pages/Reports';
import CreateReport from './pages/CreateOccurrence';

import Login from './pages/Login';

const MainStack = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: {
      header: null
    }
  },
  CreateReport: {
    screen: CreateReport,
    navigationOptions: {
      header: null
    }
  }
}, {
  mode: 'modal',
  navigationOptions: {
    tabBarLabel: <Text style={{ textAlign: 'center' }}>Mapa</Text>,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="map" size={24} color={tintColor} />
    ),
  },
})

const PrivateStack = createMaterialBottomTabNavigator(
  {
    MoreInfo: {
      screen: ReportsScreen,
      navigationOptions: {
        tabBarLabel: <Text style={{ textAlign: 'center' }}>Informações</Text>,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="info" size={24} color={tintColor} />
        ),
      },
    },
    Reports: {
      screen: ReportsScreen,
      navigationOptions: {
        tabBarLabel: <Text style={{ textAlign: 'center' }}>Ocorrências</Text>,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="description" size={24} color={tintColor} />
        ),
      },
    },
    Main: MainStack,
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: <Text style={{ textAlign: 'center' }}>Sintomas</Text>,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Main',
    activeColor: '#4c88d6',//#4c88d6
    inactiveColor: '#666',
    barStyle: {
      backgroundColor: '#FFF',
    },
  },
);

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Login,
      PrivateStack,
    },
    {
      initialRouteName: 'Login',
    },
  ),
);

export default Routes;
