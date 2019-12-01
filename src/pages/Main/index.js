import React, { useCallback } from 'react';

import { View, StyleSheet } from 'react-native';
import { Fab, Icon } from 'native-base';
import { Paragraph, Portal } from 'react-native-paper';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { useSelector } from 'react-redux'

const Main = ({ navigation }) => {

  const currentPosition = useSelector(state => state.auth.initialPosition);

  console.log({ currentPosition })

  return (
    <Portal.Host>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          rotateEnabled={false}
          loadingEnabled={true}
          zoomEnabled={true}
          //mapType="satellite"
          toolbarEnabled={false}
          initialRegion={INITIAL_REGION}>
        </MapView>
      </View>
    </Portal.Host>
  );
};


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    opacity: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#4c88d6',
    zIndex: 9999,
  },

  fabClose: {
    backgroundColor: 'red',
  },

  structionContainer: {
    backgroundColor: '#000e',
    height: 85,
    padding: 20,
  },
});

const INITIAL_REGION = {
  latitude: -22.979744,
  longitude: -43.365654,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default Main;
