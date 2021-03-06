import React, { Component } from 'react';
import { Container } from 'native-base';
import { Appbar } from 'react-native-paper';
import { logout } from '../../store/ducks/auth'
import { connect } from 'react-redux';

import { ScrollView, Image } from 'react-native';
import InfoImg from "../../shared/imgs/info2.png"

class PageInfo2 extends Component {

  render() {

    const goBackTo = this.props.navigation.getParam('goBackTo', 'Main')
    return (
      <Container>

        <Appbar.Header dark={true}>
          <Appbar.BackAction  onPress={() =>  this.props.navigation.navigate({
            routeName: goBackTo
          })} />

          <Appbar.Content title="Advertências" />
          <Appbar.Action icon="exit-to-app" onPress={() => this.props.logout()} />
        </Appbar.Header>
        
        <ScrollView>
          <Image source={InfoImg}/>
        </ScrollView>
      </Container>

    );
  }
}



const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { logout })(PageInfo2);







