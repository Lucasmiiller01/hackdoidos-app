import React, { Component } from 'react';

import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import MarkerPostsPoints from "../Maps/Point/posts";
import HeatMap from "../Maps/Heat";

import { Card, Paragraph, Title, Text, Divider } from 'react-native-paper';

import Icon from "react-native-vector-icons/MaterialIcons";

import Geolocation from '@react-native-community/geolocation'

import mosquitoImg from '../../shared/imgs/mosquito.png'
import mosquitoVermelhoImg from '../../shared/imgs/mosquito_vermelho.png'

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

  renderInitialCard = () => {
    return (
      <Card.Content style={{ flex: 1 }}>
        <View style={{ flex:1 , flexDirection: 'row', borderBottomColor: '#CCC', padding: 20, paddingTop: 8  }}>
          <Image source={mosquitoImg} />
          <View style={{ flex: 1, marginLeft: 20 }}>
            <Title>Nivel de Ameaça</Title>
            <Paragraph>O Seu nível de ameaça é baixo.</Paragraph>
          </View>
        </View>

        <Divider/>
        {['As diferenças entre vetores', 'Ações de Controle', 'Sintomas de arboviroses'].map((text, key) => (
          <TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate({
            routeName: 'PageInfo',
            params: {
              goBackTo: 'Main'
            }
          })} key={key}>
            <Text style={[styles.title, styles.font]}>{text}</Text>
            <Icon name={'keyboard-arrow-right'} size={30} style={{ color: "#4c88d6" }} />
          </TouchableOpacity>
        ))}
      </Card.Content>
    )
  }

  renderResult = () => {
    return (
      <Card.Content style={{ flex: 1 }}>
        <View style={{ flex:1 , flexDirection: 'row', borderBottomColor: '#CCC', padding: 20  }}>
          <Image source={mosquitoVermelhoImg} />
          <View style={{ flex: 1, marginLeft: 20 }}>
            <Title>Vá ao posto de saúde!</Title>
            <Paragraph>Você pode estar com Dengue!</Paragraph>
          </View>
        </View>

        <Divider/>

        {['Advertências da secretária de saúde', 'Como se Prevenir', 'Como Identificar os Focos'].map((text, key) => (
          <TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate({
            routeName: text === 'Advertências da secretária de saúde' ?'PageInfo2' : 'PageInfo',
            params: {
              goBackTo: 'Main'
            }
          })} key={key}>
            <Text style={[styles.title, styles.font]}>{text}</Text>
            <Icon name={'keyboard-arrow-right'} size={30} style={{ color: "#4c88d6" }} />
          </TouchableOpacity>
        ))}
      </Card.Content>
    )
  }


  render() {

    const { navigation } = this.props;

    const isResultTest = navigation.getParam('resultTest', false)

    return (
      <View style={[styles.container]}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          rotateEnabled={false}
          loadingEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          toolbarEnabled={false}
          initialRegion={this.state.position}>
          <HeatMap/>
        </MapView>

        <Card style={{ flex: 3, shadowColor: '#000', shadowOffset: -5 }}>
          {isResultTest ? this.renderResult() : this.renderInitialCard()}
        </Card>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    //...StyleSheet.absoluteFillObject,
    flex: 4
  },
  fab: {
    opacity: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#4c88d6',
    zIndex: 9999,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: "white",
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
