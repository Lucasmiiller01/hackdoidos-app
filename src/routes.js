import React from 'react';

import { Text } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import MainScreen from './pages/Main';
import SymptomsScreen from './pages/Symptoms';
import SymptomsScreen1 from './pages/Symptoms/fase1';
import SymptomsScreen2 from './pages/Symptoms/fase2';
import SymptomsScreen3 from './pages/Symptoms/fase3';
import SymptomsScreen4 from './pages/Symptoms/fase4';
import SymptomsScreenEnd from './pages/Symptoms/end';

import ReportsScreen from './pages/Reports';
import CreateOccurrenceCameraScreen from './pages/CreateReport';
import CreateOccurrenceScreen from './pages/CreateReport/form'

import Login from './pages/Login';
import PageInfo from './pages/PageInfo';
import PageInfo2 from './pages/PageInfo/adverte';



const MainStack = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: {
      header: null
    }
  },
}, {
  navigationOptions: {
    tabBarLabel: <Text style={{ textAlign: 'center' }}>Mapa</Text>,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="map" size={24} color={tintColor} />
    ),
  },
})

const CreateOccurrenceStack = createStackNavigator({
  CreateOccurrenceCamera: {
    screen: CreateOccurrenceCameraScreen,
    navigationOptions: {
      header: null
    }
  },
  CreateOccurrenceForm: {
    screen: CreateOccurrenceScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
  navigationOptions: {
    tabBarLabel: <Text style={{ textAlign: 'center' }}>Reporte</Text>,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="camera-alt" size={24} color={tintColor} />
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
    Reports: CreateOccurrenceStack,
    Main: MainStack,
    Profile: {
      screen: SymptomsScreen,
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
    activeColor: '#4c88d6',
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
      PageInfo,
      SymptomsScreen1,
      SymptomsScreen2,
      SymptomsScreen3,
      SymptomsScreen4,
      SymptomsScreenEnd,
      PageInfo2,

    },
    {
      initialRouteName: 'Login',
    },
  ),
);

export default Routes;
