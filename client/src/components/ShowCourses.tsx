import React, { useEffect, useLayoutEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Card, Col } from "antd";
import { Course } from "../models/course";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";
import { addBasketItemAsync } from "../redux/slice/basketSlice";

interface Props {
  course: Course;
}

const ShowCourses = ({ course }: Props) => {
  const [spanVal, setSpanVal] = useState<number>();

  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  const { userCourses } = useAppSelector((state) => state.user);
  const { currentLecture } = useAppSelector((state) => state.lecture);

  const checkWidth = (): void => {
    if (window.innerWidth > 1024) {
      setSpanVal(6);
    } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
      setSpanVal(8);
    } else {
      setSpanVal(12);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", checkWidth);
    return () => window.addEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    checkWidth();
  }, []);

  const showStars = (rating: number): [] => {
    const options: any = [];
    for (let i = 1; i < rating; i++) {
      options.push(<FaIcons.FaStar key={i} />);
      if (rating - i < 1 && rating - i > 0.3) {
        options.push(<FaIcons.FaStarHalf key={i + 1} />);
      }
    }
    return options;
  };

  return (
    <>
      <Col className="gutter-row" span={spanVal}>
        <Card
          hoverable
          cover={<img width="100%" alt="course-cover" src={course.image} />}
        >
          <Link to={`/course/${course.id}`}>
            <div className="course__title">{course.title}</div>
          </Link>
          <div className="course__instructor">{course.instructor}</div>
          <div className="course__rating">
            {course.rating}
            <span>{showStars(course.rating)}</span>
          </div>
          <div className="course__bottom">
            <div className="course__bottom__price">{course.price}</div>
            {userCourses?.find((item: Course) => item.id === course.id) !==
            undefined ? (
              <Link to={`/learn/${course.id}/${currentLecture}`}>
                <div className="course__bottom__cart">Go to Course</div>
              </Link>
            ) : basket?.items.find((item) => item.courseId === course.id) !==
              undefined ? (
              <Link to="/basket">
                <div className="course__bottom__cart">Go to Cart</div>
              </Link>
            ) : (
              <div
                onClick={() =>
                  dispatch(addBasketItemAsync({ courseId: course.id }))
                }
                className="course__bottom__cart"
              >
                Add to Cart
              </div>
            )}
          </div>
        </Card>
      </Col>
    </>
  );
};

export default ShowCourses;
