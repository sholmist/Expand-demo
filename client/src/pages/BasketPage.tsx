import { useEffect, useState } from "react";
import { Table } from "antd";
import * as FaIcons from "react-icons/fa";
import agent from "../actions/agent";
import { Basket, CourseItem } from "../models/basket";
import { useStoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";

const BasketPage = () => {
  const [items, setItems] = useState<Basket | null>();

  const { basket, removeItem } = useStoreContext();
  const basketCount = basket?.items.length || 0;
  const total = basket?.items.reduce((sum, item) => sum + (item.price || 0), 0);

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
      .catch((error) => {
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
      render: (price: number) => <div>${price}</div>,
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
      <h2 className="basket-page__sub-header">{`${basketCount} ${
        basketCount! > 1 ? "courses" : "course"
      } in the cart`}</h2>
      <div className="basket-page__body">
        <div className="basket-page__body__table">
          <Table columns={columns} dataSource={items?.items} />
        </div>
        {total! > 0 && (
          <div className="basket-page__body__summary">
            <h2>Total:</h2>
            <div className="basket-page__body__summary__total">
              $ {total ? total : 0}
            </div>
            <Link to={"/basket"}>
              <div className="basket-page__body__summary__checkout">
                Checkout
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketPage;
