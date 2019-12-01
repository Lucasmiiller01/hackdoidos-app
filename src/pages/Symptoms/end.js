import React, { Component } from 'react';
import { Container } from 'native-base';
import {  IconButton, Text } from 'react-native-paper';
import { logout } from '../../store/ducks/auth'
import { connect } from 'react-redux';

import { Image, View } from 'react-native';
import InfoImg from "../../shared/imgs/frontal-headaches.png"
class Symptoms extends Component {

  render() {
    return (
      <Container>

       
        <Text style={{color: "#4c88d6", textAlign: "center", fontSize: 22, marginTop: 20}}> Final </Text>
        <View style={{justifyContent: "center", alignItems: "center", marginTop:50}}>
          <Image source={InfoImg}/>
          <View style={{flexDirection: 'row', justifyContent: "center", marginVertical: 20, marginTop: 50}}>
          <View  style={{backgroundColor: "#4c88d6", borderRadius: 20, marginHorizontal: 20}}>

            <IconButton
              icon="close"
              color={"#FFF"}
              size={50}
              onPress={() =>this.props.navigation.navigate({routeName: 'SymptomsScreenEnd'})}            />
          </View>

            <View  style={{backgroundColor: "#4c88d6", borderRadius: 20 }}>
              <IconButton
                  icon="check-bold"
                  color={"#FFF"}
                  size={50}
                  onPress={() =>this.props.navigation.navigate({routeName: 'SymptomsScreenEnd'})}              />
            </View>

          
            </View>

        </View>
      </Container>

    );
  }
}





const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { logout })(Symptoms);







