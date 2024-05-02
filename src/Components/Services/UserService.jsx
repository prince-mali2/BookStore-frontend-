import axios from "axios";

export const userRegistration = (user) => {
  var response = axios.post("http://localhost:5001/api/v1/users", user);
  return response;
};

export const userLogin = (user) => {
  var response = axios.post("http://localhost:5001/api/v1/users/login", user);
  return response;
};
