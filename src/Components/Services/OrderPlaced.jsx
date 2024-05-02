import axios from "axios";

const baseUrl = "http://localhost:5001/api/v1/cart";

const headerConfig = {
  headers: {
    Authorization: `bearer ${localStorage.getItem("auth")}`,
  },
};

export const orderPlacedSuccessfull = (id) => {
  const response = axios.put(`${baseUrl}/${id}`, "", headerConfig);
  return response;
};
