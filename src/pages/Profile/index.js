import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';

import { Appbar, Avatar, Text, Button } from 'react-native-paper';

import { connect } from 'react-redux';
import { toggleModalPassword } from '../../store/ducks/profile'
import { logout } from '../../store/ducks/auth'

import moment from 'moment';

import sourceEmptyProfile from '../../shared/imgs/empty-profile.png'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  }
});

class Profile extends Component {

  render() {

    const { loaded, profile, error, toggleModalPassword } = this.props;

    return (
      <View style={styles.container}>
        <Appbar.Header dark={true}>
          <Appbar.Content title="Perfil" />
          <Appbar.Action icon="exit-to-app" onPress={() => this.props.logout()} />

        </Appbar.Header>
        {loaded && !error ? (
          <>
            <Avatar.Image
              style={{ alignSelf: 'center', marginVertical: 20 }}
              size={100}
              source={sourceEmptyProfile}
            />

            <Text style={{ fontSize: 20, textAlign: 'center' }}>{profile.user_proper_name || profile.username}</Text>

            <View style={{ marginVertical: 20 }}>
              <Text style={{ fontSize: 14, color: '#333', textAlign: 'center' }}>
                Ultimo Acesso
            </Text>

              <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5 }}>
                {moment(profile.last_login).format('LLL')}
              </Text>
            </View>

            <Button icon="lock" onPress={() => toggleModalPassword(true)}>
              Alterar Senha
          </Button>
          </>
        ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>{error ? 'Erro ao carregar as informações' : 'Carregando...'}</Text>
            </View>
          )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.data,
  loaded: state.auth.loaded,
  error: state.auth.error
});

export default connect(mapStateToProps, { toggleModalPassword, logout })(Profile);
