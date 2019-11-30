import React, { useCallback } from 'react';

import { View, StyleSheet } from 'react-native';
import { Fab, Icon } from 'native-base';
import { Paragraph, Portal } from 'react-native-paper';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Drawer from "./drawer";

import { useSelector } from 'react-redux'

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

const Main = ({ navigation }) => {  
  const [addAvailable, setAddAvailable] = React.useState(false);
  const openModal = useSelector(state => state.main.openModal);
  const stylesFab = [styles.fab];

  if (addAvailable) {
    stylesFab.push(styles.fabClose);
  }

  const callActionPressOnMapView = useCallback(e => {
    if (addAvailable) {

      setAddAvailable(false);

      navigation.navigate('CreateReport', {
        coordinate: {
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        }
      });
    }
  });

  return (
    <Portal.Host>
      <View style={styles.container}>
        {addAvailable && (
          <Portal>
            <View style={styles.structionContainer}>
              <Paragraph style={{ color: '#FFF' }}>
                Pressione um local no mapa para cadastrar uma denuncia
              </Paragraph>
            </View>
          </Portal>
        )}

        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{ ...styles.map, zIndex: openModal ? -1 : 1 }}
          rotateEnabled={false}
          loadingEnabled={true}
          zoomEnabled={true}
          mapType="satellite"
          toolbarEnabled={false}
          initialRegion={{
            latitude: -22.979744,
            longitude: -43.365654,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          onPress={callActionPressOnMapView}>

        </MapView>
        <Drawer />

        <Fab
          style={stylesFab}
          position="bottomRight"
          onPress={() => setAddAvailable(!addAvailable)}>
          <Icon name={addAvailable ? 'close' : 'add'} />
        </Fab>



      </View>
    </Portal.Host>
  );
};

export default Main;
