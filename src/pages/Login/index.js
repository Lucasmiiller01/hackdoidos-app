import React, { Component } from 'react';


import {
  Text, StyleSheet, View, KeyboardAvoidingView, Keyboard, Animated, TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import { connect } from "react-redux";
import { login as Login } from "../../store/ducks/auth";
import { bindActionCreators } from "redux";
import { reduxForm, Field } from "redux-form";
import Loading from "../../shared/loading";
import InputRedux from "../../shared/form/inputRedux";
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    //height: 400,
    //width: 400,
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#CCC',
    flex: 2,

  },
  map: {
    opacity: 0.3,
    ...StyleSheet.absoluteFillObject
  },
});

class formLogin extends Component {

  _keyboardDidShow = () => {
    this.setState({ keyBoard: true });

  };

  _keyboardDidHide = () => {
    this.setState({ keyBoard: false });
  };

  componentDidMount() {

    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );

    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      // webClientId: '212639900631-cc9v4j058rsn3a589bd47plefq0upmv6.apps.googleusercontent.com',
    });
    //Check if user is already signed in
    // this._isSignedIn();
  }
  componentDidCatch() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  /*
  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      //Get the User details as user is already signed in
      this._getCurrentUserInfo();
    } else {
      //alert("Please Login");
      console.log('Please Login');
    }
    this.setState({ gettingLoginStatus: false });
  };*/
  /*_getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.tron.log('User Info --> ', userInfo);
      this.props.Login({ data: userInfo, googleSignin: true });
      this.setState({ userInfo: userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };*/
  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      this.props.Login({ data: userInfo, googleSignin: true });

      //  this.setState({ userInfo: userInfo });
    } catch (error) {
      // console.tron.log('Message', error.message);

      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  /*_signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };*/

  renderBtnLogin() {
    const { Login, handleSubmit, submitting, navigation } = this.props;
    if (submitting) return <Loading text="validando credencias ..." />
    return (

      <TouchableOpacity
        onPress={handleSubmit(Login)}
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ef6c00",
          width: 300,
          height: 40,
          zIndex: 50,
          opacity: 1,
          borderRadius: 5
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold"
          }}
        >
          LOGIN
          </Text>
      </TouchableOpacity>
    );

  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ alignSelf: "center", marginTop: 40, zIndex: 22, opacity: 1 }}>
          <Text style={{ fontSize: 30 }}>Arbo Viroses</Text>
        </View>

      

        <View style={{ justifyContent: "center", alignItems: "center", flex: 2, zIndex: 22, opacity: 1 }} >
          <KeyboardAvoidingView
            style={{ zIndex: 22, opacity: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            enabled
          >

            <Field
              style={{ width: 300, height: 60, opacity: 0.8 }}
              theme={{
                colors: {
                  placeholder: '#FFFFFF', text: '#FFFFFF', primary: '#FFFFFF',
                  underlineColor: 'transparent',
                  background: "#ef6c00"
                }
              }}
              autoFocus
              name="username"
              label="Usuário"
              placeholder="Digite seu usuário"
              mode="flat"
              component={InputRedux}
            />
            <Field
              style={{
                width: 300, height: 60, opacity: 0.8
              }}
              theme={{
                colors: {
                  placeholder: '#FFF', text: '#000', primary: '#FFF',
                  underlineColor: 'transparent',
                  background: "#ef6c00"
                }
              }}
              name="password"
              secureTextEntry
              label="Senha"
              mode="flat"
              placeholder="Digite sua senha"
              component={InputRedux}
            />


          </KeyboardAvoidingView>
          {this.renderBtnLogin()}

          <Text style={{ fontSize: 16, marginVertical: 6, fontWeight: "bold", color: "#ef6c00" }}>OU</Text>
          <GoogleSigninButton
            style={{
              width: 300, height: 50, borderRadius: 5
            }}
            size={GoogleSigninButton.Size.Icon}

            color={GoogleSigninButton.Color.Light}
            onPress={this._signIn}

            disabled={this.props.submitting} />

        </View>

      </View>

    );
  }
}
const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      Login
    },
    dispatch
  );

formLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(formLogin);

export default reduxForm({ form: "LOGIN" })(formLogin);
