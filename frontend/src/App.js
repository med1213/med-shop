import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import ProductDetails from "./components/products/ProductDetails";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Register from "./components/user/Register";
import ProtectedRoute from "./components/route/ProtectRoute";

import { loadUser } from "./services/user.services";
import store from "./Store";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/carts/Cart";
import Shipping from "./components/carts/Shipping";
import ConfirmOrder from "./components/carts/ConfirmOrder";

import axios from "axios";
import { useSelector } from "react-redux";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/carts/Payment";
import OrderSuccess from "./components/carts/OrderSuccess";
import ListOrders from "./components/orders/ListOrders";
import OrderDetails from "./components/orders/OrderDetails";
// admin
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import OrdersList from "./components/admin/OrdersList";
import UpdateProduct from "./components/admin/UpdateProduct";
import ProcessOrder from "./components/admin/ProcessOrder";
import ProductReviews from "./components/admin/ProductReviews";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");

      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />
            {stripeApiKey && (
              <Route
                path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/me"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/me"
              element={
                <ProtectedRoute>
                  <ListOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
          </Routes>
        </div>
        {/* admin Dashboard */}
        <Routes>
          <Route
            path="/dashboard"
            isAdmin={true}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
          path="/admin/products"
          isAdmin={true}
          element={<ProtectedRoute><ProductsList /></ProtectedRoute>}
          
        />
        <Route
          path="/admin/product"
          isAdmin={true}
          element={<ProtectedRoute><NewProduct /></ProtectedRoute>}
          
        />
        <Route
          path="/admin/product/:id"
          isAdmin={true}
          element={<ProtectedRoute><UpdateProduct /></ProtectedRoute>}
          
        />
        <Route
          path="/admin/orders"
          isAdmin={true}
          element={<ProtectedRoute><OrdersList /></ProtectedRoute>}
          
        />
        <Route
          path="/admin/order/:id"
          isAdmin={true}
          element={<ProtectedRoute><ProcessOrder /></ProtectedRoute>}
          
        />
        <Route
          path="/admin/users"
          isAdmin={true}
          element={<ProtectedRoute><UsersList /></ProtectedRoute>}
          
        />
        <Route
          path="/admin/user/:id"
          isAdmin={true}
          element={<ProtectedRoute><UpdateUser /></ProtectedRoute>}
          
        />
        <Route
          path="/admin/reviews"
          isAdmin={true}
          element={<ProtectedRoute><ProductReviews /></ProtectedRoute>}
          
        />

        </Routes>
        
        {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
      </div>
    </Router>
  );
}

export default App;
