import exp from "constants";
import React from "react";
import * as FaIcon from "react-icons/fa";
/*TODO Placeholder change src later*/
import Logo from "../assets/placeholder_logo.png";

const Navigation = () => {
  return (
    <div className="nav-container">
      <div className="nav">
        <div className="nav__left">
          <img className="nav__left__logo" src={Logo} alt="logo" />
          <ul className="nav__left__list">
            <div className="nav__left__list__item">Categories</div>
            <div className="nav__left__list__item">Courses</div>
          </ul>
        </div>
        <div className="nav__right">
            <form className="nav__right__search">
                <input type="text" className="nav__right__search__input" placeholder="Search courses..." />
                <button className="nav__right__search__button">
                    <FaIcon.FaSearch />
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
