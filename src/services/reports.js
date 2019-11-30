import api from "./api";

export const allReports = () =>
    api().get("reports");

export const myReports = () =>
    api().get("my_reports");

export const createReport = (values) => {
  const formData = new FormData();
  Object.keys(values).forEach(key => {
    formData.append(key, values[key]);
  });
  return api().post('make_report', formData, {
    timeout: 10000
  });
}
