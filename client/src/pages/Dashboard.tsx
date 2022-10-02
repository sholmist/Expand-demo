import { Button, Row } from "antd";
import { useEffect } from "react";
import ShowCourses from "../components/ShowCourses";
import { Course } from "../models/course";
import { addRole, fetchCurrentUser } from "../redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";

const Dashboard = () => {
  const { userCourses, user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const becomeInstructor = async () => {
    await dispatch(addRole());
    dispatch(fetchCurrentUser());
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>My courses</h1>
        {!user?.roles?.includes("Instructor") && (
          <Button onClick={becomeInstructor} type="primary">
            Become an instructor
          </Button>
        )}
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
