import api from "./api";


export const getAllByRaio = (name) =>
    api().get(`get_layer/${name}`);


