import { useEffect, useState } from "react";
import { Table } from "antd";
import * as FaIcons from "react-icons/fa";
import agent from "../actions/agent";
import { Basket, CourseItem } from "../models/basket";

const BasketPage = () => {
  const [items, setItems] = useState<Basket | null>();

  useEffect(() => {
    agent.Baskets.get().then((response) => {
      newData(response);
    });
  });

  const newData = (items: Basket | null) => {
    items?.items.map((item: CourseItem, index: number) => 
        Object.assign(item, { key: index })
    );
    
    setItems(items);
}; 

const removeItem = (courseId: string) => {
    agent.Baskets.removeItem(courseId).catch((error ) => {
        console.log(error);
    });
};

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string) => <img width="100px" src={url} alt={url}></img>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Instructor",
      key: "instructor",
      dataIndex: "instructor",
    },
    {
      title: "Action",
      key: "action",
      render: (item: CourseItem) => (
        <div onClick={() => removeItem(item.courseId)}>
          <FaIcons.FaTrash />
        </div>
      ),
    },
  ];

  return (
    <div className="basket-page">
      <h1 className="basket-page__header">Shopping Cart</h1>
      <Table columns={columns} dataSource={items?.items} />
    </div>
  );
};

export default BasketPage;
