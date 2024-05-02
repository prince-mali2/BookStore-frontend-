import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Home/Header";
import "../BookDescription/BookDescription.css";
import Rating from "../Rating/Rating";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToCart, getBooksInCart, removeToCart } from "../Services/CartService";

import {
  addToWishList,
  removeToWishList,
  getAllWishlist,
} from "../Services/WishList";

export default function BookDescription() {
  const location = useLocation();
  const book = location.state.book;
  const [isWhishlisted, setIsWishlisted] = useState(false);
  const [inStock, setInStock] = useState("ADD TO BAG");
  const [bookQuantity, setBookQuantity] = useState(0);
  const [message, setMessage] = useState("");
  
  
  const whishlist = () => {
    console.log("whishlisting", isWhishlisted);
    if (!isWhishlisted) {
      addToWishList(book._id)
        .then((res) => {
          console.log("added to wishlist",res);
          setIsWishlisted(true);
        })
        .catch((err) => {
          console.log("Error there", err.response.data.message);
          setMessage(err.response.data.message);
          console.log(err);
        });
    } else {
      removeToWishList(book._id)
        .then((res) => {
          console.log(res);
          setIsWishlisted(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getBooksInCart().then((res)=>{
      if(res != null){
      var getBook = res.data.data.books.filter((elem) => {
        console.log("product id",elem.productId);
        console.log(book);
        return elem.productId === book._id;
      });
      if(getBook[0] != null){
        setBookQuantity(getBook[0].quantity)
      }
    }}).catch((err)=>{
      console.log(err);
    })
    getAllWishlist()
      .then((res) => {
        console.log("getting request",res);
        var getBook = res.data.data.books.filter((elem) => {
          console.log("product id",elem.productId);
          console.log(book);
          return elem.productId === book._id;
        });
        if (getBook[0] != null) {
          setIsWishlisted(true);
          setMessage("data fetched successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const addToBag = () => {
    console.log("Quantity", bookQuantity);
    if (book.quantity < 1) {
      setInStock("Out Of Stock");
    } else if (book.quantity >= 1) {
     
      changeQuantity("increment")
      // setInStock("Added To Bag");
    } else {
      setInStock("Added To Bag");
    }
  };

  const changeQuantity = (changeType) => {
    console.log(changeType);
    if (changeType === "decrement") {
      removeToCart(book._id)
        .then((res) => {
          var quantity = res.data.data.books.filter((items)=>{
            
            if(items.productId == book._id){
              return book.quantity
            }
          })
          setBookQuantity(quantity[0].quantity)
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (changeType === "increment") {
      // console.log("Adding books----------------")
      addToCart(book._id)
        .then((res) => {
          console.log(res);
         
          var quantity = res.data.data.books.filter((items)=>{
            
            if(items.productId == book._id){
              return book.quantity
            }
          })
          setBookQuantity(quantity[0].quantity)
          
          setInStock("Added To Bag");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="bookDescription-container">
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
            <b style={{ color: "grey" }}>Home/</b>
            <b style={{ fontSize: "1em" }}> Books({book.quantity})</b>
          </div>
        </div>
      </div>
      <div className="bookDescription-body-detail">
        <div className="book-image">
          <div className="book-cover">
            <img
              src={book.bookImage}
              alt=""
              style={{ height: "20em", width: "100%" }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8%",
            }}
          >
           
            


            { bookQuantity == 0 ? (
              <div
                style={{
                  height: "2em",
                  width: "46%",
                  backgroundColor: "#A03037",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={addToBag}
              >
                <div>ADD TO BAG</div>
              </div>
            ):(
              <>
              {bookQuantity > book.quantity ? (

                <div
                  style={{
                    height: "2em",
                    width: "46%",
                    backgroundColor: "wheat",
                    color: "red",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={addToBag}
                >
                  <div>
                    <b> Out Of Stock </b>
                  </div>
                </div>
              ):
              (
                <div
                  style={{
                    height: "2em",
                    width: "46%",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={addToBag}
                >
                  <div
                    style={{
                      border: "1px solid #DBDBDB",
                      color: "#DBDBDB",
                      width: "25%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      fontSize: "2.5em",
                      borderRadius: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => changeQuantity("decrement")}
                  >
                    <div style={{ marginBottom: "20%" }}>-</div>
                  </div>
                  <div
                    style={{
                      border: "1px solid #DBDBDB",
                      width: "40%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#333232",
                    }}
                  >
                    {bookQuantity}
                  </div>
                  <div
                    style={{
                      border: "1px solid #DBDBDB",
                      width: "25%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#333232",
                      fontSize: "2em",
                      borderRadius: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => changeQuantity("increment")}
                  >
                    <div style={{ marginBottom: "20%" }}>+</div>
                  </div>
                </div>
              )}
            </>)}
            

            
            {isWhishlisted  ? (
              <div
                style={{
                  width: "46%",
                  border: "1px solid #333333",
                  backgroundColor: "white",
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={whishlist}
              >
                <div style={{ marginTop: "3%", cursor: "pointer" }}>
                  <FavoriteIcon sx={{ color: "red" }} />
                </div>
                <div style={{ cursor: "pointer" }}>WHISHLISTED</div>
              </div>
            ) : (
              <div
                style={{
                  width: "46%",
                  backgroundColor: "#333333",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",

                }}
                onClick={whishlist}
              >
                <div style={{ marginTop: "3%" }}>
                  <FavoriteIcon sx={{ color: "white" }} />
                </div>
                <div>WHISHLIST</div>
              </div>
            )}
          </div>
        </div>

        <div className="book-description-detail">
          <h2 style={{ fontFamily: "sans-serif" }}> {book.bookName}</h2>
          <div style={{ color: "#878787", marginTop: "-2%" }}>
            by {book.author}
          </div>
          <div style={{ display: "flex", marginTop: "1%" }}>
            <div>
              <Rating />
            </div>
            <div style={{ color: "#878787", marginLeft: "12%" }}>(20)</div>
          </div>
          <h2 style={{}}>Rs. {book.price}</h2>
          <div style={{ border: ".1px solid #9D9D9D", width: "100%" }}></div>
          <div style={{ display: "flex", marginTop: "3%", color: "#878787" }}>
            <div style={{ marginTop: "3%" }}>*</div> <div>Book Details</div>
          </div>
          <div
            style={{
              fontSize: ".9em",
              width: "100%",
              display: "flex",
              alignItems: "start",
              marginLeft: "1%",
            }}
          >
            <h5
              style={{
                marginTop: 0,
                color: "#373434",
              }}
            >
              {book.description}
            </h5>
          </div>

          <div style={{ border: ".1px solid #9D9D9D", width: "100%" }}></div>

          <div
            style={{
              fontFamily: "monospace",
              marginTop: "2%",
            }}
          >
            <b
              style={{
                color: "#0A0102",
                fontSize: "1.2em",
              }}
            >
              {" "}
              Customer Feedback
            </b>
          </div>
          <div
            style={{
              backgroundColor: "#F5F5F5",
              marginTop: "2%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <div style={{ marginLeft: "2%" }}>Overall rating</div>
            <div
              style={{ display: "flex", marginLeft: "2%", marginTop: ".5%" }}
            >
              <StarIcon sx={{ color: "white" }} />
              <StarIcon sx={{ color: "white" }} />
              <StarIcon sx={{ color: "white" }} />
              <StarIcon sx={{ color: "white" }} />
              <StarIcon sx={{ color: "white" }} />
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              style={{
                border: "grey",
                marginLeft: "3%",
                marginTop: "1%",
                color: "#707070",
                padding: "1%",
                width: "92%",
                height: "20%",
              }}
            >
              Write your review
            </textarea>
          </div>
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
