import axios from 'axios';
import store from "../store";
import Config from 'react-native-config';

const api = () => {
  if (store.getState().auth.data) {
    return axios.create({
      baseURL: Config.API_URL || "https://apps.newfields.com/barra_limpa/api/v1",
      headers: {
        Authorization: `Bearer ${store.getState().auth.data.access_token}`
      }
    });
  } else {
    return axios.create({ baseURL: Config.API_URL || "https://apps.newfields.com/barra_limpa/api/v1", });
  }
};

export default api;
