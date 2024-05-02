import React, { useEffect, useState } from "react";
import Header from "../Home/Header";
import "../Cart/Cart.css";
import PinDropIcon from "@mui/icons-material/PinDrop";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  getBooksInCart,
  removeToCart,
} from "../Services/CartService";
import { addBuyerDetails } from "../Services/BuyerDetails";
import { orderPlacedSuccessfull } from "../Services/OrderPlaced";

export default function Cart() {
  const [getAddress, setGetAddress] = useState(false);
  const [getOrder, setGetOrder] = useState(false);
  const [books, setBooks] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [addressDetail, setAddressDetail] = useState(true);
  const [customerDetails, setCustomerDetails] = useState({
    fullName: "",
    phone: Number,
    address: "",
    city: "",
    state: "",
  });
  const navigate = useNavigate();

  const getAddressDetails = () => {
    setAddressDetail(false);
    setGetAddress(!getAddress);
  };

  const getOrderSummary = () => {
    console.log("inside order summary");
    saveBuyersDetail();
    setGetOrder(true);
  };

  const orderPlacedSuccessful = () => {
    orderPlacedSuccessfull()
      .then((res) => {
        console.log("order placed succcess", res);
      })
      .catch((err) => console.log(err));
    navigate("/orderPlacedSuccessful");
  };

  const decreaseQuantity = (book) => {
    var id = book.productId;
    // removeToCart(id)
    //   .then((res) => {
    //     console.log("removing", res);
    //     getBookById(id).then((res) => {
    //       console.log("get book", res);
    //       setCartQuantity(res.data.data[0].books[0].quantity);
    //       console.log("book from db", res.data.data[0].books[0].quantity);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const increaseQuantity = (book) => {
    console.log(book);
    var id = book.productId;
    // addToCart(id)
    //   .then((res) => {
    //     console.log("adding", res);
    //     getBookById(id).then((res) => {
    //       console.log(res);
    //       setCartQuantity(res.data.data[0].books[0].quantity);
    //       console.log("book from db", res.data.data[0].books[0].quantity);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const changeHandler = {
    fullName: (e) => {
      setCustomerDetails((prev) => ({ ...prev, fullName: e.target.value }));
    },
    phone: (e) => {
      setCustomerDetails((prev) => ({ ...prev, phone: e.target.value }));
    },
    address: (e) => {
      setCustomerDetails((prev) => ({ ...prev, address: e.target.value }));
    },
    city: (e) => {
      setCustomerDetails((prev) => ({ ...prev, city: e.target.value }));
    },
    state: (e) => {
      setCustomerDetails((prev) => ({ ...prev, state: e.target.value }));
    },
  };

  const saveBuyersDetail = () => {
    console.log("in saving");
    addBuyerDetails(customerDetails)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBooksInCart()
      .then((res) => {
        console.log("cart books", res);
        setBooks(res.data.data.books);
        if (res.data.data.length > 1) {
          const quant = res.data.data.reduce((a, b) => {
            return a.books[0].quantity + b.books[0].quantity;
          });
          setCartQuantity(quant);
        } else {
          setCartQuantity(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div className="cart-container">
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
            <b style={{ fontSize: "1em" }}> My cart</b>
          </div>
        </div>
      </div>
      <div className="bookDescription-body">
        <div className="cart-book-detail">
          <div
            style={{
              height: "20%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1%",
            }}
          >
            <div style={{ marginLeft: "3%" }}>
              {" "}
              <b style={{ fontSize: "1.2em", color: "#0A0102" }}>
                {" "}
                My cart({cartQuantity})
              </b>
            </div>
            <div
              style={{
                display: "flex",
                border: "1px solid grey",
                height: "60%",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "2%",
              }}
            >
              <PinDropIcon sx={{ color: "maroon" }} />
              <h5 style={{ color: "#0A0102" }}>
                BridgeLabz Solutions LLP, No...
              </h5>
              <ArrowDropDownIcon sx={{ color: "grey" }} />
            </div>
          </div>
          <div style={{ height: "auto" }}>
            {books.map((item) => 
               
            (
             
              <div
                style={{
                  height: "56%",
                  display: "flex",
                  marginTop: "5%",
                }}
              >
                <div
                  style={{
                    width: "16%",
                    height: "8em",
                    display: "flex",
                    padding: "10px",
                  }}
                >
                  <img
                    src={item.bookImage}
                    alt="img"
                    style={{ width: "80%", height: "80%" }}
                  />
                </div>
                <div style={{ width: "25%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      height: "20%",
                      color: "#0A0102",
                    }}
                  >
                    <b> {item.bookName}</b>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      height: "20%",
                      color: "#9D9D9D",
                    }}
                  >
                    <b> {item.author}</b>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      height: "20%",
                      color: "#0A0102",
                    }}
                  >
                    <b>Rs. {item.price}.00</b>
                  </div>
                  <div
                    style={{ display: "flex", height: "40%" }}
                    className="cart-counter"
                  >
                    {addressDetail ? (
                      <>
                        <div
                          style={{
                            height: "1.5em",
                            marginTop: "15%",
                            marginLeft: "5%",
                            width: "46%",
                            color: "white",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
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
                              fontSize: "2em",
                              borderRadius: "100%",
                              backgroundColor: "#DBDBDB",
                            }}
                          >
                            <div
                              style={{ marginBottom: "35%", color: "#333232" }}
                              onClick={() => decreaseQuantity(item)}
                              className="decease-quant"
                            >
                              -
                            </div>
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
                            {cartQuantity}
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
                              fontSize: "1.5em",
                              borderRadius: "100%",
                              backgroundColor: "#DBDBDB",
                            }}
                          >
                            <div
                              style={{ marginBottom: "30%" }}
                              onClick={() => increaseQuantity(item)}
                              className="increase-quant"
                            >
                              +
                            </div>
                          </div>
                        </div>
                        <div style={{ marginTop: "15%", marginLeft: "15%" }}>
                          Remove
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <b>Qty: {cartQuantity}</b>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: "20%" }}>
            {!getAddress && (
              <button
                style={{
                  marginLeft: "78%",
                  width: "18%",
                  height: "2.5em",
                  marginTop: "2.5%",
                  backgroundColor: "#3371B5",
                  color: "white",
                  border: "1px solid #3371B5",
                  marginBottom: "1em",
                }}
                onClick={getAddressDetails}
              >
                PLACE ORDER
              </button>
            )}
          </div>
        </div>
        <div
          style={{
            width: "70%",
          }}
        >
          {getAddress ? (
            <div
              style={{
                marginTop: "1.2%",
                border: "1px solid #707070",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "1.5%",
                }}
              >
                <div style={{ marginLeft: "2%" }}>
                  <b style={{ fontSize: "1.2em" }}> Customer Details</b>
                </div>
                {!getOrder && (
                  <div
                    style={{
                      marginRight: "5%",
                      border: "1px solid #A03037",
                      color: "#A03037",
                      width: "20%",
                      height: "2em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Add New Address
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  marginLeft: "4%",
                  marginTop: "3%",
                  justifyContent: "space-between",
                  width: "70%",
                }}
              >
                <div
                  style={{
                    width: "46%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <label htmlFor="">Full Name</label>
                  </div>
                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      placeholder="prince"
                      onChange={changeHandler.fullName}
                      style={{
                        width: "100%",
                        height: "3em",
                        padding: "0 5%",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "46%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <label htmlFor="">Mobile Nummber</label>
                  </div>
                  <div style={{ width: "100%" }}>
                    <input
                      type="number"
                      onChange={changeHandler.phone}
                      placeholder="7005268726"
                      style={{
                        width: "100%",
                        height: "3em",
                        padding: "0 5%",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "2%",
                    marginLeft: "2%",
                  }}
                >
                  <RadioButtonCheckedIcon sx={{ color: "#A03037" }} />
                  <div>
                    <b>1.WORK</b>{" "}
                  </div>
                  <div
                    style={{
                      fontSize: ".8em",
                      marginTop: ".5%",
                      marginLeft: "2%",
                      color: "#A03037",
                    }}
                  >
                    {" "}
                    <b> Edit</b>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginLeft: "5%",
                      width: "100%",
                    }}
                  >
                    <div style={{ marginTop: "1%" }}>
                      <label htmlFor="">Address</label>
                    </div>
                    <input
                      type="text"
                      placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Accusantium deserunt recusandae ex eaque. Incidunt aliquid
                      sit veritatis asperiores. Autem neque qui dolorum enim
                      dolor necessitatibus, possimus fugiat maiores vero maxime!"
                      style={{
                        width: "71.5%",
                        height: "6em",
                        marginTop: "1%",
                      }}
                      onChange={changeHandler.address}
                    />
                  </div>
                  <div style={{ display: "flex", marginBottom: "2%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginLeft: "5%",
                        width: "34%",
                      }}
                    >
                      <div style={{ marginTop: "1%" }}>
                        <label htmlFor="">city/town</label>
                      </div>
                      <input
                        type="text"
                        name=""
                        id=""
                        onChange={changeHandler.city}
                        placeholder="Jalandhar"
                        style={{
                          width: "100%",
                          height: "3em",
                          marginTop: "1%",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginLeft: "3.5%",
                        width: "34%",
                      }}
                    >
                      <div style={{ marginTop: "1%" }}>
                        <label htmlFor="">state</label>
                      </div>
                      <input
                        type="text"
                        name=""
                        id=""
                        onChange={changeHandler.state}
                        placeholder="Punjab"
                        style={{
                          width: "100%",
                          height: "3em",
                          marginTop: "1%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {!getOrder && (
                <>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        marginTop: "2%",
                        marginLeft: "2%",
                      }}
                    >
                      <RadioButtonUncheckedIcon />

                      <div>
                        <b>2.Home</b>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                      <div style={{ marginLeft: "5%" }}> Address </div>
                    </div>
                    <div
                      style={{
                        marginLeft: "5%",
                        width: "72%",
                      }}
                    >
                      in Hey there My name is prince Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Cum debitis eligendi in Hey
                      there My name is Chand Lorem ipsum dolor sit hh
                    </div>
                  </div>

                  <div>
                    <button
                      style={{
                        marginTop: "2%",
                        marginLeft: "80%",
                        marginBottom: "5%",
                        width: "15%",
                        height: "2.5em",
                        backgroundColor: "#3371B5",
                        color: "white",
                        border: "1px solid #3371B5",
                      }}
                      onClick={getOrderSummary}
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div
              style={{
                border: "1px solid #707070",
                height: "3.5em",
                marginTop: "1.2%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "0 5%",
                color: "#333232",
              }}
            >
              <b> Address Details</b>
            </div>
          )}
        </div>
        <div style={{ width: "70%", height: "auto" }}>
          {getOrder ? (
            <div
              style={{
                border: "1px solid #707070",
                marginTop: "1.2%",
                minHeight: "12em",
              }}
            >
              <div
                style={{
                  minHeight: "20%",
                  display: "flex",
                  marginTop: "1%",
                  marginLeft: "3%",
                }}
              >
                {" "}
                <b style={{ fontSize: "1.2em", color: "#0A0102" }}>
                  {" "}
                  Order summary
                </b>
              </div>
              {books.map((item) => (
                <>
                  <div
                    style={{
                      height: "56%",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        height :"40%",
                        width: "21%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img src={item.bookImage} alt="img" />
                    </div>
                    <div style={{ width: "25%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          height: "20%",
                          color: "#0A0102",
                        }}
                      >
                        <b> {item.bookName}</b>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          height: "20%",
                          color: "#9D9D9D",
                        }}
                      >
                        <b>{item.author}</b>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          height: "20%",
                          color: "#0A0102",
                        }}
                      >
                        <b>Rs. {item.price}.00</b>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "100%" }}>
                    <button
                      style={{
                        color: "white",
                        backgroundColor: "#3371B5",
                        border: "1px solid #3371B5",
                        height: "2em",
                        width: "15%",
                        marginLeft: "76%",
                      }}
                      onClick={orderPlacedSuccessful}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <div
              style={{
                border: "1px solid #707070",
                height: "3.5em",
                marginTop: "1.2%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "0 5%",
                color: "#333232",
              }}
            >
              <b> Order summary</b>
            </div>
          )}
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
