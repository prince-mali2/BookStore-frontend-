import React, { useState } from "react";
import "./Signup.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { userRegistration } from "../Services/UserService";
import logo from "../../Assets/logo.png";

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    mobileNumber: 0,
  });

  
  const loginClickHandler = () => {
    navigate("/");
  };

  const nameHandler = (e) => {
    console.log(e.target.value)
    setUser((prev) => ({ ...prev, fullName: e.target.value }));
  };

  const emailHandler = (e) => {
    setUser((prev) => ({ ...prev, email: e.target.value }));
  };

  const passwordHandler = (e) => {
    setUser((prev) => ({ ...prev, password: e.target.value }));
  };

  const numberHandler = (e) => {
    setUser((prev) => ({ ...prev, mobileNumber: e.target.value }));
  };

  const submit = () => {
    userRegistration(user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img
          src={logo}
          alt=""
          srcset=""
          style={{
            width: "70%",
            height: "60%",
            marginLeft: "0%",
            borderRadius: "50%",
            marginTop: "7%",
          }}
        />
        <div
          style={{
            marginTop: "7%",
            width: "70%",
          }}
        >
          <h3
            style={{
              marginTop: "7%",
              width: "100%",
              textAlign: "center",
              fontSize: "1.4em",
            }}
          >
            ONLINE BOOK SHOPPING
          </h3>
        </div>
      </div>
      <div className="signup-form-container">
        <div className="signup-form-header">
          <div onClick={loginClickHandler}>
            <h2
              style={{
                fontSize: "1.8em",
                height: "1.1em",
                cursor: "pointer",
                color: "gray",
              }}
            >
              LOGIN
            </h2>
          </div>
          <div>
            <h2
              style={{
                fontSize: "1.8em",
                cursor: "pointer",
                height: "1.1em",
                padding: "0%",
              }}
            >
              SIGNUP
              <hr
                style={{
                  marginTop: "0%",

                  height: "20%",
                  backgroundColor: "maroon",
                  width: "30%",
                  borderRadius: "10px",
                }}
              />
            </h2>
          </div>
        </div>
        <div className="signup-form-body">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "15%",
            }}
          >
            <label htmlFor="" style={{ textAlign: "left" }}>
              Full Name
            </label>
            <TextField
              sx={{ width: "80%" }}
              size="small"
              onChange={nameHandler}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "15%",
            }}
          >
            <label htmlFor="" style={{ textAlign: "left" }}>
              Email Id
            </label>
            <TextField
              sx={{ width: "80%" }}
              size="small"
              onChange={emailHandler}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "15%",
            }}
          >
            <label htmlFor="" style={{ textAlign: "left" }}>
              Password
            </label>
            <TextField
              sx={{ width: "80%" }}
              size="small"
              onChange={passwordHandler}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "15%",
            }}
          >
            <label htmlFor="" style={{ textAlign: "left" }}>
              Mobile Number
            </label>

            <TextField
              sx={{ width: "80%" }}
              size="small"
              onChange={numberHandler}
            />
          </div>
        </div>
        <div className="signup-form-footer">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "68%",
              height: "2.5em",
              backgroundColor: "maroon",
              color: "white",
              cursor: "pointer",
            }}
            onClick={submit}
          >
            Signup
          </div>
        </div>
      </div>
    </div>
  );
}
