import { Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Course } from "../models/course";
import {
  getPublishedCourses,
  getUnpublishedCourses,
} from "../redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";

const InstructorPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUnpublishedCourses());
    dispatch(getPublishedCourses());
  }, [dispatch]);

  const { unpublishedCourses, publishedCourses } = useAppSelector(
    (state) => state.user
  );

  const makeCourse = () => {
    history.push("/instructor/course");
  };

  return (
    <div className="instructor">
      <div className="instructor__top">
        <div className="instructor__left">
          <div className="instructor__left__header">
            {unpublishedCourses.length > 0
              ? "My unpublished courses"
              : "Create new course"}
          </div>
          <div className="instructor__left__courses">
            {unpublishedCourses.map((course: Course, index: number) => {
              return (
                <Link key={index} to={`${course.id}/lectures`}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img src={course.image} alt={course.title} />}
                  >
                    <Meta title={course.title} description={course.subtitle} />
                  </Card>
                </Link>
              );
            }, [])}
          </div>
        </div>
        <div className="instructor__right">
          <Button onClick={makeCourse} type="primary">
            New course
          </Button>
        </div>
      </div>

      <div className="instructor__bottom">
        <div className="instructor__left__header">
          {publishedCourses.length > 0
            ? "My published courses"
            : "Create new course"}
        </div>
        <div className="instructor__left__courses">
          {publishedCourses.map((course: Course, index: number) => {
            return (
              <Link key={index} to={`course/${course.id}`}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img src={course.image} alt={course.title} />}
                >
                  <Meta title={course.title} description={course.subtitle} />
                </Card>
              </Link>
            );
          }, [])}
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
