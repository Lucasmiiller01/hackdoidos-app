import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import { connect } from 'react-redux';

import { Text } from 'react-native-paper';

import FormCreateOccurrence from './form';
import {ScrollView} from 'react-native-gesture-handler';

import { RNCamera } from 'react-native-camera';
//import UploadImage from '../../components/UploadImage';

class CreateOccurrence extends Component {

  camera; 

  state = {
    showed: false
  }

  componentDidMount = () => {
    this.setState({ showed: true });
  }

  componentDidUpdate = () => {
    this.setState({ showed: this.props.navigation.isFocused() });
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.state.showed !== this.props.navigation.isFocused();
  }

  componentWillUnmount() {
    this.setState({ showed: false });
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      console.log(data.base64);
    }
  };

  render() {

    console.log(this.state.showed);
    
    return (
      <View style={styles.root}>

        {this.state.showed && (
          <>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permissão para usar câmera',
                message: 'Nós precisamos de acessa a sua câmera para você registrar a ocorrência com uma imagem anexada.',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              
            />  

            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }
}

{/* <Appbar.Header dark={true}>
            <Appbar.BackAction onPress={closeModal} />
            <Appbar.Content title="Nova " />
          </Appbar.Header>
    
          <ScrollView>
            <FormCreateOccurrence  />
          </ScrollView> */}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(CreateOccurrence);
