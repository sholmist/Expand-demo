// import exp from "constants";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import * as FaIcon from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
/*TODO Placeholder change src later*/
import Logo from "../assets/placeholder_logo.png";
import { setCourseParams } from "../redux/slice/courseSlice";
import { signOut } from "../redux/slice/userSlice";
import { useAppSelector } from "../redux/store/configureStore";
import UserMenu from "./UserMenu";

const Navigation = () => {
  const [sidebar, setSidebar] = useState(false);
  const [searchText, setSearchText] = useState("");

  const showSidebar = () => setSidebar(!sidebar);

  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const basketCount = basket?.items.length;

  const navigate = useNavigate();

  const signout = () => {
    dispatch(signOut);
    navigate("/");
  };

  const handeleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setCourseParams({ search: searchText }));
  };

  return (
    <div className="nav-container">
      <div className="nav">
        <div className="nav__left">
          <div className="nav__left__hamburger">
            <FaIcon.FaBars onClick={showSidebar} />
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="cancel">
                  <FaIcon.FaChevronLeft />
                </li>

                <li className="nav-menu-items__header">Navigation</li>
                <Link to="/">
                  {" "}
                  <li>Home</li>{" "}
                </Link>
                {user ? (
                  <>
                    <Link to="/profile">
                      <li>Profile</li>
                    </Link>{" "}
                    <div onClick={signout}>
                      {" "}
                      <li>Logout</li>{" "}
                    </div>{" "}
                  </>
                ) : (
                  <Link to="/login">
                    <li>Login</li>
                  </Link>
                )}
              </ul>
            </nav>
          </div>

          <img className="nav__left__logo" src={Logo} alt="logo" />
          <ul className="nav__left__list">
            <Link to="/">
              <li className="nav__left__list__item">Home</li>
            </Link>
            {user ? (
              <li className="nav__left__list__item">
                <UserMenu />
              </li>
            ) : (
              <Link to="/login">
                <li className="nav__left__list__item">Login</li>
              </Link>
            )}
          </ul>
        </div>

        <div className="nav__right">
          <form onSubmit={onSearch} className="nav__right__search">
            <input
              type="text"
              className="nav__right__search__input"
              placeholder="Search courses..."
              onChange={handeleChange}
              value={searchText}
            />
            <button className="nav__right__search__button">
              <FaIcon.FaSearch />
            </button>
          </form>
          <Link to={"/basket"}>
            <div className="nav__right__cart">
              <FaIcon.FaShoppingCart />
              {basketCount! > 0 && (
                <div className="nav__right__cart__count">{basketCount}</div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
