import api from "./api";
import moment from "moment";

// route: /show_me
export const requestProfile = async () =>
  api().get("profile");


export const requestChangePassword = ({ password, password_verify }) => {

  const data = new FormData();

  data.append('password', password);
  data.append('password_verify', password_verify);

  return api().post("change_password", data);
}
