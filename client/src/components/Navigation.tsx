// import exp from "constants";
import React, { useState } from "react";
import * as FaIcon from "react-icons/fa";
import { Link } from "react-router-dom";
/*TODO Placeholder change src later*/
import Logo from "../assets/placeholder_logo.png";
import { useAppSelector } from "../redux/store/configureStore";

const Navigation = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const { basket } = useAppSelector((state) => state.basket);

  const basketCount = basket?.items.length;

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
                  <li>Home</li>
                </Link>
              </ul>
            </nav>
          </div>
          <img className="nav__left__logo" src={Logo} alt="logo" />
          <ul className="nav__left__list">
            <div className="nav__left__list__item">Courses</div>
          </ul>
        </div>
        <div className="nav__right">
          <form className="nav__right__search">
            <input
              type="text"
              className="nav__right__search__input"
              placeholder="Search courses..."
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
