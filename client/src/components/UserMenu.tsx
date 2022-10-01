import { Dropdown, Menu } from "antd";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { removeBasket } from "../redux/slice/basketSlice";
import { signOut } from "../redux/slice/userSlice";
import { useAppSelector } from "../redux/store/configureStore";

const UserMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const signout = () => {
    dispatch(signOut());
    dispatch(removeBasket());
    history.push("/");
  };

  const { user } = useAppSelector((state) => state.user);

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      {user?.roles?.includes("Instructor") && (
        <Menu.Item>
          <Link to="/instructor">Instructor</Link>
        </Menu.Item>
      )}
      <Menu.Item>
        <div onClick={signout}>Logout</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown placement="bottom" overlay={menu}>
      <div className="dropdown">Menu</div>
    </Dropdown>
  );
};

export default UserMenu;
