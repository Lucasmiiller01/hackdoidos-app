import axios from 'axios';
import store from "../store";
import Config from 'react-native-config';

const api = () => {
  if (store.getState().auth.data) {
    return axios.create({
      baseURL: Config.API_URL || "http://localhost/api/",
      headers: {
        Authorization: `Bearer ${store.getState().auth.data.access_token}`
      }
    });
  } else {
    return axios.create({ baseURL: Config.API_URL || "http://localhost/api/", });
  }
};

export default api;
