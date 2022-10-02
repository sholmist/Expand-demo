import { Button, Card, notification } from "antd";
import { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import agent from "../actions/agent";
import { getUnpublishedCourses } from "../redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";

const SectionPage = ({ match }: RouteComponentProps<any>) => {
  const [sectionName, setSectionName] = useState<string>("");
  const [lectureForm, setLectureForm] = useState<any>([]);

  const { unpublishedCourses } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const currentCourse = unpublishedCourses.find(
    (course: any) => course.id === match.params.course
  );

  useEffect(() => {
    if (!unpublishedCourses) dispatch(getUnpublishedCourses());
  }, [dispatch, unpublishedCourses]);

  const prevIsValid = () => {
    if (lectureForm.length === 0) {
      return true;
    }

    const someEmpty = lectureForm.some(
      (item: any) => item.Url === "" || item.Title === ""
    );

    if (someEmpty) {
      lectureForm.forEach((item: any, index: number) => {
        const allPrev = [...lectureForm];

        if (lectureForm[index].Title === "") {
          allPrev[index].errors.Title = "Title is required";
        }

        if (lectureForm[index].Url === "") {
          allPrev[index].errors.Url = "Url is required";
        }

        setLectureForm(allPrev);
      });
    }

    return !someEmpty;
  };

  const handleAddLink = (event: any) => {
    event.preventDefault();

    const inputState = {
      Title: "",
      Url: "",

      errors: {
        Title: null,
        Url: null,
      },
    };

    if (prevIsValid()) {
      setLectureForm((prev: any) => [...prev, inputState]);
    }
  };

  const publishCourse = async () => {
    try {
      const response = await agent.Courses.publish(match.params.course);

      notification.success({
        message: response,
      });
      history.push("/profile");
    } catch (error: any) {
      console.log(error);
    }
  };

  const publishSection = async () => {
    try {
      const response = await agent.Lectures.create({
        courseId: match.params.course,
        sectionName: sectionName,
        lectures: lectureForm,
      });

      notification.success({
        message: response,
      });

      setSectionName("");
      setLectureForm([]);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleRemoveField = (event: any, index: number) => {
    event.preventDefault();

    setLectureForm((prev: any) =>
      prev.filter((item: any) => item !== prev[index])
    );
  };

  const handleChange = (event: any, index: number) => {
    setLectureForm((prev: any) => {
      return prev.map((item: any, i: number) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,
          errors: {
            ...item.errors,
            [event.target.name]:
              event.target.value.length > 0
                ? null
                : [event.target.name] + " is required",
          },
        };
      });
    });
  };

  return (
    <div className="section-page">
      <h1>Create Sections {currentCourse?.title}</h1>
      <Card>
        <input
          className="input-section"
          placeholder="Section Name"
          value={sectionName}
          required={true}
          onChange={(e) => setSectionName(e.target.value)}
        />
        {lectureForm.map((item: any, index: number) => (
          <div key={`item-${index}`} className="section-page__lectures">
            <div className="section-page__lectures__item">
              <input
                name="Title"
                className="input-lecture"
                placeholder="Lecture Title"
                value={item.Title}
                required={true}
                onChange={(e) => handleChange(e, index)}
              />
              {item.errors.Title && (
                <div className="invalid-feedback">{item.errors.Title}</div>
              )}
            </div>
            <div className="section-page__lectures__item">
              <input
                name="Url"
                className="input-lecture"
                placeholder="Lecture Url"
                value={item.Url}
                required={true}
                onChange={(e) => handleChange(e, index)}
              />
              {item.errors.Url && (
                <div className="invalid-feedback">{item.errors.Url}</div>
              )}
            </div>
            <Button
              type="primary"
              danger
              onClick={(e) => handleRemoveField(e, index)}
            ></Button>
          </div>
        ))}
      </Card>
      <Button type="dashed" onClick={handleAddLink}>
        Add Lecture
      </Button>
      <Button
        className="publish-section"
        type="primary"
        onClick={publishSection}
      >
        Publish Section
      </Button>
      <Button className="publish-course" type="primary" onClick={publishCourse}>
        Publish Course
      </Button>
    </div>
  );
};

export default SectionPage;
