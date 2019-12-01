import React, { Component } from 'react';
import { Container } from 'native-base';
import { Appbar } from 'react-native-paper';
import { logout } from '../../store/ducks/auth'
import { connect } from 'react-redux';

import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

class Reports extends Component {

  render() {
    return (
      <Container>

        <Appbar.Header dark={true}>
          <Appbar.Content title="Informações" />
          <Appbar.Action icon="exit-to-app" onPress={() => this.props.logout()} />
        </Appbar.Header>

        

        {['As diferenças entre vetores', 'Ações de Controle', 'Sintomas de arboviroses'].map((text, key) => (
          <TouchableOpacity style={styles.row} onPress={() => this.props.navigation.navigate({
            routeName: 'PageInfo'
          })} key={key}>
            <Text style={[styles.title, styles.font]}>{text}</Text>
            <Icon name={'keyboard-arrow-right'} size={30} style={{ color: "#4c88d6" }} />
          </TouchableOpacity>
        ))}
      </Container>

    );
  }
}




const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "#000",
    fontWeight: "normal",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: "white",
  },


});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { logout })(Reports);







