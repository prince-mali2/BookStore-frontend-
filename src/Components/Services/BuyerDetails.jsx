import axios from "axios";

const headerConfig = {
  headers: {
    Authorization: `bearer ${localStorage.getItem("auth")}`,
  },
};

const baseUrl = "http://localhost:5001/api/v1/buyerDetails";

export const addBuyerDetails = (data) => {
  var response = axios.post(baseUrl, data, headerConfig);
  return response;
};
