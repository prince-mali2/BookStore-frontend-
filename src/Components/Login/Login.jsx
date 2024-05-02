import React from "react";
// import book from "../../assets/icons/Group 5.svg";
import { useState } from "react";
import "./Login.css";
import logo from "../../Assets/logo.png";

// import UserRegistrationService from "../../services/UserRegistrationService";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { userLogin } from "../Services/UserService";

export default function Login() {
  const navigate = useNavigate();
  // const [success, setSuccess] = useState("");
  // const [failure, setFailure] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // const handleLoginInput = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setUser({ ...user, [name]: value });
  //   console.log(user);
  // };

  // const loginHandler = (e) => {
  //   e.preventDefault();
  //   let loginUser = {
  //     email: user.email,
  //     password: user.password,
  //   };
  //   UserRegistrationService.loginUser(loginUser)
  //     .then((response) => {
  //       // alert(response.data.message);
  //       console.log(response);
  //       let token = response.data.data;
  //       localStorage.setItem("token", token);
  //       setSuccess(response.data.message);
  //       props.history.push({
  //         pathname: "/libarary",
  //       });
  //     })
  //     .catch((error) => {
  //       alert(error.response.data.data);
  //       setFailure(error.response.data.data);
  //     });
  // };

  const signUpClickHandler = () => {
    navigate("/signUp");
  };

  const submit = () => {
    userLogin(user)
      .then((res) => {
        // console.log(res.data.data);
        localStorage.setItem("auth", res.data.data);
        alert(res.data.message);
        navigate("/home");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const emailHandler = (e) => {
    setUser((prev) => ({ ...prev, email: e.target.value }));
  };

  const passwordHandler = (e) => {
    setUser((prev) => ({ ...prev, password: e.target.value }));
  };

  return (
    <>
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
        <div className="form-container">
          <div className="form-header">
            <div>
              <h2
                style={{
                  fontSize: "1.8em",
                  cursor: "pointer",
                  height: "1.1em",
                  padding: "0%",
                }}
              >
                LOGIN
                <hr
                  style={{
                    marginTop: "0%",
                    height: "20%",
                    backgroundColor: "maroon",
                    width: "40%",
                    borderRadius: "10px",
                  }}
                />
              </h2>
            </div>
            <div onClick={signUpClickHandler}>
              <h2
                style={{
                  fontSize: "1.8em",
                  cursor: "pointer",
                  height: "1.1em",
                  padding: "0%",
                  color: "gray",
                }}
              >
                SIGNUP
              </h2>
            </div>
          </div>
          <div className="login-form-body">
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
            <br />
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
              <label
                style={{ marginLeft: "28%", color: "grey", cursor: "pointer" }}
              >
                Forgot Password?
              </label>
            </div>
            <br />
            <div style={{ width: "80%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "86%",
                  height: "2.5em",
                  backgroundColor: "maroon",
                  color: "white",
                  marginLeft: "19%",
                  cursor: "pointer",
                }}
                onClick={submit}
              >
                Login
              </div>
            </div>
          </div>
          <div className="login-form-footer">
            <hr
              style={{
                border: "1px solid lightgray",
                width: "20%",
                marginLeft: "25%",
              }}
            />
            <h3>OR</h3>
            <hr
              style={{
                border: "1px solid lightgray",
                width: "20%",
                marginRight: "25%",
              }}
            />
          </div>
          <div
            className="footer-button"
            style={{
              height: "25%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "33%",
                height: "2.5em",
                textAlign: "center",
                paddingTop: "1.6%",
                marginRight: "2%",
                marginLeft: "1%",
                backgroundColor: "#4266B2",
                color: "white",
                cursor: "pointer",
              }}
            >
              Facebook
            </div>
            <div
              style={{
                width: "33%",
                height: "2.5em",
                textAlign: "center",
                paddingTop: "1.6%",
                backgroundColor: "lightgray",
                cursor: "pointer",
              }}
            >
              Google
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
