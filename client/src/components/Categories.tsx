import React, { useEffect, useState } from "react";
import agent from "../actions/agent";
import { Category } from "../models/category";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    agent.Categories.list().then((response) => {
      setCategories(response);
    });
    }, []);

    return (
        <div className="categories">
            {categories && categories.map((category: Category, index: number) => (
                    <div key={index} className="categories__name">
                        {category.name}
                    </div>
            ))}
        </div>
    )
};

export default Categories;
