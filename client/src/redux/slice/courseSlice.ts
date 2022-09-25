import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../actions/agent";
import { Course } from "../../models/course";
import { PaginatedCourse } from "../../models/paginatedCourse";
import { RootState } from "../store/configureStore";

const coursesAdapter = createEntityAdapter<Course>();

export const getCoursesAsync = createAsyncThunk<
  PaginatedCourse | undefined,
  void
>("course/getCoursesAsync", async () => {
  try {
    return await agent.Courses.list();
  } catch (err) {
    console.log(err);
  }
});

export const getCourseAsync = createAsyncThunk<
  Course | undefined,
  { courseId: string }
>("course/getCourseAsync", async ({ courseId }) => {
  try {
    return await agent.Courses.getById(courseId);
  } catch (err) {
    console.log(err);
  }
});

export const courseSlice = createSlice({
  name: "course",
  initialState: coursesAdapter.getInitialState({
    coursesLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoursesAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCoursesAsync.fulfilled, (state, action) => {
        coursesAdapter.setMany(state, action.payload!.data);
        state.status = "idle";
        state.coursesLoaded = true;
      })
      .addCase(getCoursesAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(getCourseAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCourseAsync.fulfilled, (state, action) => {
        coursesAdapter.upsertOne(state, action.payload!);
        state.status = "idle";
      })
      .addCase(getCourseAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const coursesSelector = coursesAdapter.getSelectors(
  (state: RootState) => state.course
);
