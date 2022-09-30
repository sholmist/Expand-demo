import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import "antd/dist/antd.css";
import Login from "./pages/Login";
import DetailPage from "./pages/DetailPage";
import Categories from "./components/Categories";
import CategoryPage from "./pages/CategoryPage";
import BasketPage from "./pages/BasketPage";
import { useAppDispatch } from "./redux/store/configureStore";
import { fetchBasketAsync } from "./redux/slice/basketSlice";
import Dashboard from "./pages/Dashboard";
import { fetchCurrentUser } from "./redux/slice/userSlice";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import DescriptionPage from "./pages/DescriptionPage";
import Homepage from "./pages/Homepage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const appInit = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error: any) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    appInit().then(() => setLoading(false));
  }, [appInit]);

  if (loading) return <Loading />;

  return (
    <>
      <Navigation />
      <Route exact path="/" component={Categories} />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/course/:id" component={DescriptionPage} />
        <Route exact path="/basket" component={BasketPage} />
        <Route exact path="/category/:id" component={CategoryPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/detail" component={DetailPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <PrivateRoute exact path="/profile" component={Dashboard} />
      </Switch>
    </>
  );
}
export default App;
