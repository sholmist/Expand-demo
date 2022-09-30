import { Row } from "antd";
import { useEffect } from "react";
import ShowCourses from "../components/ShowCourses";
import { Course } from "../models/course";
import { fetchCurrentUser } from "../redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";

const Dashboard = () => {
  const { userCourses } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>My courses</h1>
      </div>
      <div className="dashboard__courses">
        <Row gutter={[48, 32]}>
          {userCourses.length > 0 ? (
            userCourses.map((course: Course, index: number) => {
              return <ShowCourses key={index} course={course} />;
            })
          ) : (
            <h1>You have not bought any courses</h1>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
