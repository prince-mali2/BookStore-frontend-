import axios from "axios";

const baseUrl = "http://localhost:5001/api/v1/wishlist";



export const addToWishList = (id) => {
  const response = axios.post(`${baseUrl}/${id}`,"", {
   
    headers: {
      
      "Authorization": `bearer ${localStorage.getItem("auth")}`,
    },
  });
  return response;
};

export const removeToWishList = (id) => {
  const response = axios.put(`${baseUrl}/${id}`, "",{
    
    headers: {
      "Authorization": `bearer ${localStorage.getItem("auth")}`,
    },
  });
  return response;
};

export const getAllWishlist = () => {
  console.log(localStorage.getItem("auth"))
  const response = axios.get(`${baseUrl}`, {
    
    headers: {
      "Authorization": `bearer ${localStorage.getItem("auth")}`,
    },
  });
  return response;
};
