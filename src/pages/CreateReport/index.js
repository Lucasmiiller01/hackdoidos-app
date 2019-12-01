import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';

import { connect } from 'react-redux';

import { Text } from 'react-native-paper';

import { RNCamera } from 'react-native-camera';

import { FAB } from 'react-native-paper';

class CreateReport extends Component {

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

  shouldComponentUpdate = () => {
    return this.state.showed !== this.props.navigation.isFocused();
  }

  componentWillUnmount() {
    this.setState({ showed: false });
  }

  redirectToForm = (data = null) => {
    this.props.navigation.navigate({
      routeName: 'CreateOccurrenceForm',
      params: {
        image: data
      }
    })
  }

  takePictureAndRedirectToForm = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.redirectToForm(data);
    }
  };

  render() {
    
    return (
      <View style={styles.root}>

        {this.state.showed && (
          <>

            <Text style={styles.title}>
              Registre o Criadouro
            </Text>
            
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.auto}
              androidCameraPermissionOptions={{
                title: 'Permissão para usar câmera',
                message: 'Nós precisamos de acessa a sua câmera para você registrar a ocorrência com uma imagem anexada.',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              
            />  

            <View style={styles.containerButtonSnap}>
              <FAB onPress={() => this.redirectToForm()} style={styles.capture} icon="format-text"/>
              <FAB onPress={this.takePictureAndRedirectToForm} style={styles.capture} icon="camera"/>
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
            <FormCreateReport  />
          </ScrollView> */}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    alignSelf: 'center',
    margin: 10,
  },

  containerButtonSnap: { flex: 0, flexDirection: 'row', justifyContent: 'center', position: 'absolute', left: 0, bottom: 10, right: 0 },
  title: { position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', zIndex: 999, fontSize: 20, color: '#F9F9F9', backgroundColor: '#202020aa', paddingVertical: 5 }
});

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(CreateReport);
