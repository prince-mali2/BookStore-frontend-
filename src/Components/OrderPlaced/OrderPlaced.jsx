import React from "react";
import Header from "../Home/Header";
import orderSuccessful from "../../Assets/orderSuccessfull.png";
import { useNavigate } from "react-router-dom";

export default function OrderPlaced() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };
  return (
    <div className="main-cotainer">
      <div className="bookDescription-header">
        <Header />
      </div>
      <div className="body-div">
        <div style={{ marginTop: "3%" }}>
          <img src={orderSuccessful} alt="" />
        </div>
        <div style={{ width: "20%", marginLeft: "40%", color: "#333232" }}>
          <b>
            {" "}
            hurray!!! your order is confirmed the order id is #123456 save the
            order id for further communication..
          </b>
        </div>
        <div>
          <table
            style={{
              border: "1px solid #DCDCDC",
              width: "60%",
              height: "6em",
              marginLeft: "20%",
              marginTop: "5%",
            }}
          >
            <tr>
              <th
                style={{
                  border: "1px solid #DCDCDC",
                  backgroundColor: "#FAFAFA",
                }}
              >
                Email us
              </th>
              <th
                style={{
                  border: "1px solid #DCDCDC",
                  backgroundColor: "#FAFAFA",
                }}
              >
                Contact us
              </th>
              <th
                style={{
                  border: "1px solid #DCDCDC",
                  backgroundColor: "#FAFAFA",
                }}
              >
                Address
              </th>
            </tr>
            <tr>
              <td style={{ border: "1px solid #DCDCDC" }}>user email</td>
              <td style={{ border: "1px solid #DCDCDC" }}>user Contact</td>
              <td style={{ border: "1px solid #DCDCDC" }}>User Address</td>
            </tr>
          </table>
        </div>
        <div>
          <button
            style={{
              backgroundColor: "#3371B5",
              border: "1px solid #3371B5",
              color: "white",
              marginTop: "5%",
              width: "15%",
              height: "3em",
              borderRadius: "3px",
            }}
            onClick={goHome}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>

      <div className="home-footer">
        <p style={{ marginLeft: "11%" }}>
          copyright © 2020, Bookstore Private Limited. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
