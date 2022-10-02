import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card, Col, Pagination, Radio, Row } from "antd";
import ShowCourses from "../components/ShowCourses";
import { Course } from "../models/course";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";
import {
  coursesSelector,
  getCoursesAsync,
  setCourseParams,
  setPageNumber,
} from "../redux/slice/courseSlice";
import { categoriesSelector } from "../redux/slice/categorySlice";
import { Category } from "../models/category";

const sortOptions = [
  { value: "title", label: "Alphabetical" },
  { value: "priceDescending", label: "Price - High to Low" },
  { value: "priceAscending", label: "Price - Low to High" },
];

const Homepage = () => {
  const courses = useAppSelector(coursesSelector.selectAll);
  const dispatch = useAppDispatch();

  const [spanVal, setSpanVal] = useState<number>();

  const { coursesLoaded, courseParams, pagination } = useAppSelector(
    (state) => state.course
  );

  function onChange(pageNumber: number) {
    dispatch(setPageNumber({ pageIndex: pageNumber }));
  }

  useEffect(() => {
    if (!coursesLoaded) dispatch(getCoursesAsync());
  }, [dispatch, coursesLoaded]);

  const checkWidth = (): void => {
    if (window.innerWidth > 1200) {
      setSpanVal(4);
    } else if (window.innerWidth < 1200 && window.innerWidth > 1024) {
      setSpanVal(15);
    } else {
      setSpanVal(20);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", checkWidth);
    return () => window.addEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    checkWidth();
  }, []);

  const categories = useAppSelector(categoriesSelector.selectAll);

  const getCategories = () => {
    const categoryArray: any[] = [];
    categories.forEach((category: Category) => {
      categoryArray.push({ value: category.id, label: category.name });
    });
    return categoryArray;
  };

  return (
    <div className="course">
      <div className="course__header">
        <h1>What to learn next?</h1>
        <h2>New courses picked just for you...</h2>
      </div>
      <Row gutter={[24, 32]}>
        <Col span={spanVal}>
          <Card title="Sorting Options">
            <Radio.Group
              value={courseParams.sort}
              options={sortOptions}
              onChange={(e) =>
                dispatch(setCourseParams({ sort: e.target.value }))
              }
            />
          </Card>
          <Card title="Choose category">
            <Radio.Group
              value={courseParams.category}
              options={getCategories()}
              onChange={(e) =>
                dispatch(setCourseParams({ category: e.target.value }))
              }
            />
          </Card>
        </Col>
        <Col span={20}>
          <Row gutter={[24, 32]}>
            {courses &&
              courses.map((course: Course, index: number) => {
                return <ShowCourses key={index} course={course} />;
              })}
          </Row>

          <div className="pagination">
            {pagination && (
              <Pagination
                defaultCurrent={pagination?.pageIndex}
                total={pagination?.totalCount}
                pageSize={pagination?.pageSize}
                onChange={onChange}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Homepage;
