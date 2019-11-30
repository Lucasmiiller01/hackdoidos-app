import React, {Component} from 'react';

import {AppWithNavigationState} from './navigator-redux';

import {connect} from 'react-redux';

import Loading from './shared/loading';

class App extends Component {

  render() {
    const {loaded} = this.props;

    return loaded ? (
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
