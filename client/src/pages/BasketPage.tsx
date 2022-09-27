import { Table } from "antd";
import * as FaIcons from "react-icons/fa";
import { CourseItem } from "../models/basket";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";
import { removeBasketItemAsync } from "../redux/slice/basketSlice";

const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  const basketCount = basket?.items.length || 0;
  const total = basket?.items.reduce((sum, item) => sum + (item.price || 0), 0);

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
        <div
          onClick={() =>
            dispatch(removeBasketItemAsync({ courseId: item.courseId }))
          }
        >
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
          <Table
            columns={columns}
            dataSource={basket?.items}
            rowKey="courseId"
          />
        </div>
        {total! > 0 && (
          <div className="basket-page__body__summary">
            <h2>Total:</h2>
            <div className="basket-page__body__summary__total">
              $ {total ? total : 0}
            </div>
            <Link to={"/checkout"}>
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
