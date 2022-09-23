import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import agent from "../actions/agent";
import ShowCourses from "../components/ShowCourses";
import { Category } from "../models/category";
import { Course } from "../models/course";

const CategoryPage = () => {
    const [data, setData ] = useState<Category>();
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        //doesn't work without 'as string'
        agent.Categories.getCategory(parseInt(id as string)).then (response => {
            setData(response);
        })
    }, [id])
  return (
    <div className="course">
        <div className="course__header">
            <h1>Pick a course from your favorite category</h1>
            <h2>{data?.name}</h2>
        </div>
        <Row gutter={[24, 32]}>
            {data?.courses?.length ? data.courses.map((course: Course, index: number) => {
                return <ShowCourses key={index} course={course} />
            }) : <h1> There are no courses in this category</h1>};
        </Row>
    </div>
);
};

export default CategoryPage;