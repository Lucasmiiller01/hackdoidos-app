import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';
import AllReports from './allReports';
import MyReports from './myReports';
import { Appbar, Avatar, Text, Button } from 'react-native-paper';
import { logout } from '../../store/ducks/auth'
import { connect } from 'react-redux';



class Reports extends Component {


  render() {
    return (
      <Container>

        <Appbar.Header dark={true}>
          <Appbar.Content title="Denuncias" />
          <Appbar.Action icon="exit-to-app" onPress={() => this.props.logout()} />

        </Appbar.Header>
        <Tabs tabBarBackgroundColor="#ef6c00" tabBarActiveTextColor="#FFF" >
          <Tab heading="Todas" tabStyle={{ backgroundColor: "#ef6c00" }} activeTabStyle={{ backgroundColor: "#ef6c00" }}>
            <AllReports />
          </Tab>
          <Tab heading="Minhas" tabStyle={{ backgroundColor: "#ef6c00" }} activeTabStyle={{ backgroundColor: "#ef6c00" }}>
            <MyReports />
          </Tab>
        </Tabs>
      </Container>

    );
  }
}



const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { logout })(Reports);

