import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import agent from '../actions/agent';
import {Course} from '../models/course';

const DescriptionPage = () => {
    const [course, setCourse] = React.useState<Course>();
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        //doesn't work without assertion !
        agent.Courses.getById(id!).then((response) => {
            setCourse(response);
        });
    }, [id]);

    return (
        <>
            <h1>{course?.title}</h1>
        </>
    );
    }
    
    export default DescriptionPage;