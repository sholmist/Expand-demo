import React, {useState, useEffect} from "react";
import {Row} from "antd";
import agent from "../actions/agent";
import { PaginatedCourse } from "../models/paginatedCourse";
import ShowCourses from "../components/ShowCourses";

const Homepage = () => {
    const [data, setData ] = useState<PaginatedCourse>();

    useEffect(() => {

        agent.Courses.list().then(response => {
            setData(response);
        })
    }, [])



    return (
        <div className="course">
            <div className="course__header">
                <h1>Courses</h1>
                <h2>New courses picked just for you...</h2>
            </div>
            <Row gutter={[24, 32]}>
                {data && data.data.map((course, index) => {
                    return <ShowCourses key={index} course={course} />
                })};
            </Row>
        </div>

    );
};

export default Homepage;