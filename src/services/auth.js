// route: /show_me
import api from "./api";
import AsyncStorage from "@react-native-community/async-storage";

export const loginMock = async () => ({
	data: {
		name: 'Marcelo Castro',
		access_token: '123456'
	}
})

export const login = async data => await loginMock()


export const setAuthStorage = auth =>
	AsyncStorage.setItem("@auth", JSON.stringify(auth));

export const getAuthStorage = async () =>
	JSON.parse(await AsyncStorage.getItem("@auth"));

export const removeAuthStorage = () => AsyncStorage.removeItem("@auth");