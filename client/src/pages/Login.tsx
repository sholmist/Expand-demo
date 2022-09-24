import { useDispatch, useSelector } from "react-redux";
import { increment, LoginState } from "../redux/loginReducer";

const Loginpage = () => {
  const { visits } = useSelector((state: LoginState) => state);

  const dispatch = useDispatch();

  return (
    <>
      <h1>Number of visits {visits}</h1>
      <button onClick={() => dispatch(increment(5))}>Increment</button>
    </>
  );
};

export default Loginpage;
