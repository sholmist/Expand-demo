import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:5000/api/courses').then((response) => {
      console.log(response);
      setCourses(response.data);
    });
  }, []);

  return (
    <div className="App">
      <ul>
        {courses.map((course: any, index) => {
          return (
            <li key={index}>
              {course.id} 
              {course.title}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
