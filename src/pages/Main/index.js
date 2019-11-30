import React, { useCallback } from 'react';

import { View, StyleSheet } from 'react-native';
import { Fab, Icon } from 'native-base';
import { Paragraph, Portal } from 'react-native-paper';
import IconCommun from 'react-native-vector-icons/MaterialCommunityIcons';
import { types as typesMain } from "../../store/ducks/main"

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Drawer from "./drawer";
import SanitationPolygons from "../Maps/Polygons/sanitation";
import MarkersReports from "../Maps/Point/reports";
import MarkersReleasePoints from "../Maps/Point/releasePoints";
import MarkersCondosPoints from "../Maps/Point/condosPoints";
import MarkersTreatmentStations from "../Maps/Point/treatmentStations";

import { useDispatch, useSelector } from 'react-redux'

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
    //margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#ef6c00',
    //backgroundColor: 'red',
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

  const dispatch = useDispatch();

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
          <SanitationPolygons />
          <MarkersReports />
          <MarkersReleasePoints />
          <MarkersCondosPoints />
          <MarkersTreatmentStations />
        </MapView>
        <Drawer />

        <Fab
          style={{ marginBottom: 80, backgroundColor: "#ef6c00", zIndex: 10 }}
          position="bottomRight"
          onPress={() => dispatch({ type: typesMain.CHANGE_MODAL_DRAWER, payload: !openModal })}>

          <IconCommun name="layers" style={{ color: "#FFF" }} size={20} />
        </Fab>
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
