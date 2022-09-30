import { ComponentType } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { useAppSelector } from "../redux/store/configureStore";

interface Props extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
