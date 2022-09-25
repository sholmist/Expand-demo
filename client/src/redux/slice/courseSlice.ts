import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../actions/agent";
import { Course } from "../../models/course";
import { PaginatedCourse } from "../../models/paginatedCourse";

const coursesAdapter = createEntityAdapter<Course>();

const setCoursesAsync = createAsyncThunk<PaginatedCourse | undefined, void>(
  "course/setCoursesAsync",
  async () => {
    try {
      return await agent.Courses.list();
    } catch (error) {
      console.log(error);
    }
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState: coursesAdapter.getInitialState({
    coursesLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCoursesAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(setCoursesAsync.fulfilled, (state, action) => {
        coursesAdapter.setMany(state, action.payload!.data);
        state.status = "idle";
      })
      .addCase(setCoursesAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});
