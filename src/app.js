import React, {Component} from 'react';

import { PermissionsAndroid } from 'react-native'

import {AppWithNavigationState} from './navigator-redux';

import {connect} from 'react-redux';

import Loading from './shared/loading';

class App extends Component {

  state = {
    locationPermissionLoaded: false
  }

  componentDidMount = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )

    this.setState({ locationPermissionLoaded: true })
  }

  render() {
    const {loaded} = this.props;

    return loaded && this.state.locationPermissionLoaded ? (
      <AppWithNavigationState />
    ) : (
      <Loading size={50} noStyle={false} />
    );
  }
}

const mapStateToProps = state => ({
  loaded: state.auth.loaded,
});

export default connect(mapStateToProps)(App);
