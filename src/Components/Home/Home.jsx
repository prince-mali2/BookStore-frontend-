import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import { getAllBook } from "../Services/BookService";
import DropDown from "./DropDown";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Rating from "../Rating/Rating";
import Pagination from "../Pagination/Pagination";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigate();
  useEffect(() => {
    getAllBook(1)
      .then((res) => {
        // console.log("getting response",res);
        setBooks(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let PageSize = 12;
  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return books.slice(firstPageIndex, lastPageIndex);
  // });

  const showBookDescription = (book) => {
    navigation("/bookDescription", {
      state: { book: book },
    });
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <Header />
      </div>
      <div className="home-title">
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
            <b style={{ fontSize: "2em" }}> Books</b>
            <div style={{ marginTop: "1em" }}>({books.length} items)</div>
          </div>

          <div>
            <DropDown />
          </div>
        </div>
      </div>
      <div className="book-container">
        <div
          style={{
            width: "78%",
            height: "auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            
          }}
        >
          {books.map((book) => (
            <div
              style={{
                width: "20%",
                height: "auto",
                marginTop: "2%",
                border: "1px solid #575656",
                backgroundColor:"light grey",

                // overflow: "hidden",
                // transition: "transform 0.3s ease-in-out",

              }}
              onClick={() => showBookDescription(book)}
            >
              <div
                style={{
                  width: "100%",
                  height: "11em",
                  borderRadius: "5px 5px 0 0",
                  backgroundColor: "#F5F5F5",
                }}
              >
                <img
                  src={book.bookImage}
                  alt=""
                  style={{
                    height: "9em",
                    marginTop: "1em",
                  }}
                />
              </div>
              <div
                style={{
                  width: "87%",
                  height: "5.5em",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-evenly",
                  border: "2px solid #F5F5F5",
                  borderRadius: "0 0 5px 5px",
                  padding: "1% 6%",
                }}
              >
                <div>{book.bookName}</div>
                <div>by {book.author}</div>
                <div>
                  <Rating />
                </div>
                <div>
                  <b>Rs. {book.price} </b>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-container">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={books.length}
            pageSize={PageSize}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>

      <div className="home-footer">
        <p style={{ marginLeft: "11%" }}>
          copyright © 2024, Bookstore Private Limited. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
