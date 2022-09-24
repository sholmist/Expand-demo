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
import { useStoreContext } from "./context/StoreContext";
import agent from "./actions/agent";

function App() {

  const {setBasket} = useStoreContext();

  function getCookie(name: string) {
    return (
      document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    );
  }

    useEffect(() => {
      const clientId = getCookie('clientId');
      if (clientId) {
        agent.Baskets.get()
          .then((basket) => setBasket(basket))
          .catch((error) => console.log(error));
      }
    }, [setBasket]);
      

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
      </Routes>
    </>
  );
}

export default App;