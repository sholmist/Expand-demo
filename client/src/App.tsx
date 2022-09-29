import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Login";
import Navigation from "./components/Navigation";
import "antd/dist/antd.css";
import Category from "./components/Categories";
import CategoryPage from "./pages/CategoryPage";
import DescriptionPage from "./pages/DescriptionPage";
import DetailPage from "./pages/DetailPage";
import BasketPage from "./pages/BasketPage";
import { useAppDispatch } from "./redux/store/configureStore";
import { fetchBasketAsync } from "./redux/slice/basketSlice";
import Dashboard from "./pages/Dashboard";
import { fetchCurrentUser } from "./redux/slice/userSlice";
import PrivateRoute from "./components/PrivateRoute";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBasketAsync());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <Category />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/course/:id" element={<DescriptionPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/basket" element={<BasketPage />} />

        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Dashboard />} />
        </Route>
        <Route path="/checkout" element={<PrivateRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
