import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Login";
import Detailpage from "./pages/DetailPage";
import Navigation from "./components/Navigation";
import "antd/dist/antd.css";
import Category from "./components/Categories";
import CategoryPage from "./pages/CategoryPage";
import DescriptionPage from "./pages/DescriptionPage";

function App() {
  return (
    <>
      <Navigation />
      <Category />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/course/:id" element={<DescriptionPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/detail" element={<Detailpage />} />
      </Routes>
    </>
  );
}

export default App;
