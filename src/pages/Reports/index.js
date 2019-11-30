import React, { Component } from 'react';
import { Container } from 'native-base';
import { Appbar } from 'react-native-paper';
import { logout } from '../../store/ducks/auth'
import { connect } from 'react-redux';



class Reports extends Component {


  render() {
    return (
      <Container>

        <Appbar.Header dark={true}>
          <Appbar.Content title="Ocorrências" />
          <Appbar.Action icon="exit-to-app" onPress={() => this.props.logout()} />
        </Appbar.Header>
        
      </Container>

    );
  }
}



const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { logout })(Reports);

