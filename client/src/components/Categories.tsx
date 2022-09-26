import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Category } from "../models/category";
import {
  categoriesSelector,
  getCategoriesAsync,
} from "../redux/slice/categorySlice";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";

const Categories = () => {
  const categories = useAppSelector(categoriesSelector.selectAll);
  const { categoriesLoaded } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!categoriesLoaded) dispatch(getCategoriesAsync());
  }, [categoriesLoaded, dispatch]);

  return (
    <div className="categories">
      {categories &&
        categories.map((category: Category, index: number) => (
          <Link key={index} to={`/category/${category.id}`}>
            <div className="categories__name">{category.name}</div>
          </Link>
        ))}
    </div>
  );
};

export default Categories;
