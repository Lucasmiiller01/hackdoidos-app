import React, { Component } from 'react';
import { Container } from 'native-base';
import { Appbar, Button } from 'react-native-paper';
import { logout } from '../../store/ducks/auth'
import { connect } from 'react-redux';

import { View, Image } from 'react-native';
import Sintomas from "../../shared/imgs/sintomas.png"
class Symptoms extends Component {

  render() {
    return (
      <Container>

        <Appbar.Header dark={true}>

          <Appbar.Content title="Principais Sintomas" />
          <Appbar.Action icon="exit-to-app" onPress={() => this.props.logout()} />
        </Appbar.Header>

        <View style={{ flex: 1 }}>

          <Image source={Sintomas} />

          <Button mode="contained" style={{ position: 'absolute', bottom: 20, left: 10, right: 10 }}
            onPress={() => this.props.navigation.navigate({ routeName: 'SymptomsScreen1' })}>
            Faça o teste
          </Button>
        </View>
      </Container>

    );
  }
}





const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { logout })(Symptoms);







