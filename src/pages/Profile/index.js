import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';

import { Appbar, Avatar, Text } from 'react-native-paper';

import { connect } from 'react-redux';
import { logout } from '../../store/ducks/auth'

import sourceEmptyProfile from '../../shared/imgs/empty-profile.png'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  }
});

class Profile extends Component {

  render() {

    const { loaded, profile, error } = this.props;

    return (
      <View style={styles.container}>
        <Appbar.Header dark={true}>
          <Appbar.Content title="Sintomas" />
          <Appbar.Action icon="exit-to-app" onPress={() => this.props.logout()} />
        </Appbar.Header>
        
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.data,
  loaded: state.auth.loaded,
  error: state.auth.error
});

export default connect(mapStateToProps, { logout })(Profile);
