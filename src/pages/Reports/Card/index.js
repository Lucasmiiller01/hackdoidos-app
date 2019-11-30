import React, { Component, Fragment } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Text, Left, Body, View } from 'native-base';
import { List, Divider } from 'react-native-paper';

export default class CardShowcaseExample extends Component {

  state = {
    error: true,
  };

  render() {
    return (
      <Fragment>
        <List.Item
          title={`Denuncia ${this.props.item.id} ${this.props.item.date !== "Desconhecido" ? ` -  ${this.props.item.date}` : ""}`}
          description={`Enviada por: ${this.props.item.username}`}

          left={props => <List.Icon {...props} icon="alert" color="red" />}
        />
        <Text style={{ textAlign: "center" }}> {this.props.item.message} </Text>
        <Divider style={{ height: 1, marginTop: 10 }} />
      </Fragment>

    );
  }
}
