// route: /show_me
import api from "./api";
import AsyncStorage from "@react-native-community/async-storage";

import Geolocation from '@react-native-community/geolocation';
import Config from 'react-native-config';

export const loginMock = async () => ({
	data: {
		name: 'Marcelo Castro',
		access_token: '123456'
	}
})

export const login = async data => await api().post("http://172.16.8.32/hackdoidos-api/public/oauth/token", {
	username: data.username,
	password: data.password,
	client_id: Config.CLIENT_ID,
	client_secret: Config.CLIENT_SECRET,
	grant_type: "password"




})

export const setAuthStorage = auth =>
	AsyncStorage.setItem("@auth", JSON.stringify(auth));

export const getAuthStorage = async () =>
	JSON.parse(await AsyncStorage.getItem("@auth"));

export const removeAuthStorage = () => AsyncStorage.removeItem("@auth");

export const getUserLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      location => resolve(location),
      error => reject(error),
    );
});