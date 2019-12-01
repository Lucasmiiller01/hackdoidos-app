import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MarkerPostsPoints from "../Maps/Point/posts";

import Geolocation from '@react-native-community/geolocation'

const INITIAL_REGION = {
  latitude: -22.979744,
  longitude: -43.365654,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

class Main extends Component {

  state = {
    position: null
  }

  componentDidMount = async () => {
    Geolocation.getCurrentPosition(({ coords }) => {
      this.setState({ position: {
        ...coords,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      }})
    }, () => {
      this.setState(INITIAL_REGION);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          rotateEnabled={false}
          loadingEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          toolbarEnabled={false}
          initialRegion={this.state.position}>

          <MarkerPostsPoints />

        </MapView>
      </View>
    )
  }
}


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

export default Main;
