import React, { useEffect, useState } from "react";
import Header from "../Home/Header";
import { useNavigate } from "react-router-dom";
import "../WishList/WishList.css";
import { getAllWishlist } from "../Services/WishList";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

export default function WishList() {
  const [isWishlist, setIsWishlist] = useState([]);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    getAllWishlist()
      .then((result) => {
        console.log("result", result.data.data[0].books);
        setIsWishlist(result.data.data[0].books);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="WishList-board">
      <div className="bookDescription-header">
        <Header />
      </div>
      <div className="bookDescription-title">
        <div
          style={{
            width: "78%",
            height: "auto",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1%",
          }}
        >
          <div style={{ display: "flex" }}>
            <b style={{ color: "grey" }} onClick={goToHome}>
              Home/
            </b>
            <b style={{ fontSize: "1em" }}> My Wishlist</b>
          </div>
        </div>
      </div>
      <div
        style={{
          border: "1px solid #E4E4E4",
          width: "70%",
          height: "auto",
          marginLeft: "10%",
          marginTop: "1%",
        }}
      >
        <div
          style={{
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid #E4E4E4",
            backgroundColor: "#F5F5F5",
          }}
        >
          <div style={{ marginLeft: "3%" }}>
            {" "}
            <b style={{ fontSize: "1.2em", color: "#0A0102" }}>
              {" "}
              My Wishlist({isWishlist.length})
            </b>
          </div>
        </div>
        {isWishlist.map((book) => (
          <div
            style={{
              height: "auto",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ padding: "30px" }}>
              <img src={book.bookImage} alt="" style={{ width: "5em" }} />
            </div>
            <div
              style={{
                marginLeft: "-67%",
                marginTop: "3%",
                marginBottom: "3%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ fontSize: "1.3em", color: "#0A0102" }}>
                {" "}
                <b> {book.bookName}</b>
              </div>
              <div style={{ marginBottom: "15%", color: "#9D9D9D" }}>
                {book.author}
              </div>
              <div>
                <b style={{ color: "#0A0102" }}>Rs. {book.price}.00</b>
              </div>
            </div>
            <div style={{ marginTop: "2%", marginRight: "3%" }}>
              <DeleteForeverOutlinedIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
