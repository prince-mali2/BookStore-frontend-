import axios from "axios";

const baseUrl = "http://localhost:5001/api/v1/book";

// const headerConfig = {
//   headers: {
//     Authorization: `bearer ${localStorage.getItem("auth")}`,
//   },
// };

export const getAllBook = (page) => {
  console.log(localStorage.getItem("auth"));
  const response = axios.get(baseUrl, {
    
    headers: {
      "Authorization": `bearer ${localStorage.getItem("auth")}`,
    },
  });

  return response;
};
