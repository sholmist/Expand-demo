import { useEffect } from "react";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import Loading from "../components/Loading";
import { LectureDto } from "../models/lecture";
import {
  getLecturesAsync,
  setCurrentLecture,
  setCurrentLectureAsync,
  setCurrentVideo,
} from "../redux/slice/lectureSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/configureStore";

const CoursePage = ({ match }: RouteComponentProps<any>) => {
  const { lecture, lectureLoaded, currentLecture, currentVideo } =
    useAppSelector((state) => state.lecture);

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!lecture) dispatch(getLecturesAsync({ courseId: match.params.course }));
  }, [dispatch, match, lecture]);

  useEffect(() => {
    if (currentLecture === 0) {
      dispatch(setCurrentLecture(lecture?.sections[0].lectures[0].id));
      dispatch(setCurrentVideo(lecture?.sections[0].lectures[0].url));
    }

    currentLecture && history.replace(`${currentLecture}`);

    let lectureItem: LectureDto;

    if (lecture) {
      for (const item of lecture?.sections!) {
        lectureItem = item.lectures.find((lec) => lec.id === currentLecture)!;
        if (lectureItem) {
          dispatch(setCurrentVideo(lectureItem.url));
          return;
        }
      }
    }
  }, [currentLecture, dispatch, lecture, history]);

  const selectLecture = async (id: number, url: string) => {
    history.push(`${id}`);
    dispatch(setCurrentVideo(url));
    await dispatch(
      setCurrentLectureAsync({
        lectureId: id,
        courseId: match.params.course,
      })
    );
  };

  if (!lectureLoaded) return <Loading />;

  return (
    <div className="lecture">
      <div className="lecture__sidebar">
        <div className="lecture__sidebar__course">{lecture?.courseName}</div>
        {lecture &&
          lecture.sections.map((section, index) => {
            return (
              <div key={index}>
                <div className="lecture__sidebar__section">
                  {section.sectionName}
                </div>
                {section.lectures.map((lecture, index) => {
                  return (
                    <Link
                      key={index}
                      onClick={() => selectLecture(lecture.id, lecture.url)}
                      className={
                        lecture.id.toString() === match.params.lecture
                          ? "lecture__sidebar__list__item__active"
                          : "lecture__sidebar__list__item"
                      }
                      to={`${lecture.id}`}
                    >
                      <span className="lecture__sidebar__icon">
                        <FaIcons.FaPlay />
                      </span>
                      <span>{lecture.title}</span>
                    </Link>
                  );
                })}
              </div>
            );
          })}
      </div>
      <div className="lecture__video">
        <iframe
          width="100%"
          height="100%"
          title="Learnify"
          src={currentVideo}
        ></iframe>
      </div>
    </div>
  );
};

export default CoursePage;
