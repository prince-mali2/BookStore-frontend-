import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../Home/Home.css";
import { useNavigate } from "react-router-dom";
import education from "../../Assets/education.png";

export default function Header() {
  const navigate = useNavigate();
  const goToCart = () => {
    navigate("/cart");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "maroon",
          height:"5em"
        }}
      >
        <img
          src={education}
          alt=""
          style={{ marginLeft: "10%", height: "50%", marginRight: ".3%" }}
        />
        <div style={{ color: "white", marginRight: "6%" }}>Bookstore</div>
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
            width: "32%",
            height: "1.8em",
            marginTop: ".7%",
            marginRight: "39%",
          }}
        >
          <SearchIcon sx={{ height: "100%", width: "2em" }} />
          <input
            type="text"
            placeholder="Search..."
            style={{ border: "1px solid white", borderRadius:"5px"}}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "-15%",
            marginTop: ".2%",
            cursor:"pointer"

          }}
        >
          <Person2OutlinedIcon />
          Profile
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
            marginLeft: "5%",
            marginTop: ".3%",
            cursor:"pointer"
          }}
          onClick={goToCart}
        >
          <ShoppingCartOutlinedIcon />
          Cart
        </div>
      </div>
    </div>
  );
}
