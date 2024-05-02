import "./App.css";
// import Login from "./Components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
import BookDescription from "./Components/BookDescription/BookDescription";
import Cart from "./Components/Cart/Cart";
import OrderPlaced from "./Components/OrderPlaced/OrderPlaced";
import WishList from "./Components/WishList/WishList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/bookDescription" element={<BookDescription />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route
            exact
            path="/orderPlacedSuccessful"
            element={<OrderPlaced />}
          />
          <Route exact path="/wishlist" element={<WishList />} />
        </Routes>
      </BrowserRouter>
      {/* <WishList /> */}
      {/* <Home /> */}
      {/* <Cart /> */}
      {/* <OrderPlaced /> */}
    </div>
  );
}

export default App;
