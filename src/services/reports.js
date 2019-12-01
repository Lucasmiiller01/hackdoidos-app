import api from "./api";

export const allReports = () => api().get("events");

export const createReport = ({ type_event_id, lat, lng, image = null }) => {

  const data = new FormData();

  data.append('lat', lat);
  data.append('lng', lng);
  data.append('type_event_id', type_event_id);

  data.append('image', image ? {
    uri: image.uri,
    type: 'image/jpeg',
    name: 'imagem' + '.jpg'
  } : null)
 
 return api().post("events", data);

}
