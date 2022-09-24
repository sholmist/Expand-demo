import { useEffect, useState } from "react";
import { Table } from "antd";
import * as FaIcons from "react-icons/fa";
import agent from "../actions/agent";
import { Basket, CourseItem } from "../models/basket";
import { useStoreContext } from "../context/StoreContext";

const BasketPage = () => {
  const [items, setItems] = useState<Basket | null>();
  const {basket, removeItem} = useStoreContext();
  const basketCount = basket?.items.length;

  useEffect(() => {
    newData(basket);
  }, [basket]);

  const newData = (items: Basket | null) => {
    items?.items.map((item: CourseItem, index: number) => 
        Object.assign(item, { key: index })
    );
    
    setItems(items);
}; 

const removeBasketItem = (courseId: string) => {
    agent.Baskets.removeItem(courseId)
    .then(() => removeItem(courseId))
    .catch((error ) => {
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
        <div onClick={() => removeBasketItem(item.courseId)}>
          <FaIcons.FaTrash />
        </div>
      ),
    },
  ];

  return (
    <div className="basket-page">
      <h1 className="basket-page__header">Shopping Cart</h1>
      <h2 className="basket-page__sub-header">{`${basketCount} ${basketCount! > 1 ? "courses" : "course"} in the cart`}</h2>
      <Table columns={columns} dataSource={items?.items} />
    </div>
  );
};

export default BasketPage;
