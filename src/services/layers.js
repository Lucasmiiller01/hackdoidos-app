import api from "./api";


export const getLayerByName = (name) =>
    api().get(`get_layer/${name}`);


