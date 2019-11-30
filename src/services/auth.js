// route: /show_me
import api from "./api";
import AsyncStorage from "@react-native-community/async-storage";

export const loginMock = async () => ({
    user_proper_name: 'Renato Vianna Algusto',
    user_email: 'renatoviannaa@gmail.com',
    last_login: '2019-09-28 22:00:00',
    access_token: "123"
})


const encodeForm = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}
export const login = data =>
    api().post("login", encodeForm(data));


export const setAuthStorage = auth =>
    AsyncStorage.setItem("@auth", JSON.stringify(auth));

export const getAuthStorage = async () =>
    JSON.parse(await AsyncStorage.getItem("@auth"));

export const removeAuthStorage = () => AsyncStorage.removeItem("@auth");