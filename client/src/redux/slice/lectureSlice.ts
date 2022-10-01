import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../actions/agent";
import { Lecture } from "../../models/lecture";

interface LectureState {
  lecture: Lecture | null;
  currentLecture: number;
  currentVideo: string;
  lectureLoaded: boolean;
}

const lecturesAdapter = createEntityAdapter<Lecture>();

export const getLecturesAsync = createAsyncThunk<
  Lecture | undefined,
  { courseId: string }
>("lecture/getLecturesAsync", async ({ courseId }, thunkAPI) => {
  try {
    return await agent.Lectures.getLectures(courseId);
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err });
  }
});

export const setCurrentLectureAsync = createAsyncThunk<
  void,
  { lectureId: number; courseId: string }
>(
  "lecture/setCurrentLecturesAsync",
  async ({ lectureId, courseId }, thunkAPI) => {
    try {
      await agent.Lectures.setCurrentLecture({ lectureId, courseId });
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err });
    }
  }
);

export const lectureSlice = createSlice({
  name: "lecture",
  initialState: lecturesAdapter.getInitialState<LectureState>({
    lecture: null,
    lectureLoaded: false,
    currentLecture: 0,
    currentVideo: "",
  }),
  reducers: {
    setCurrentLecture: (state, action) => {
      state.currentLecture = action.payload;
    },
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLecturesAsync.pending, (state) => {
      state.lectureLoaded = false;
    });
    builder.addCase(getLecturesAsync.fulfilled, (state, action) => {
      state.lectureLoaded = true;
      state.lecture = action.payload!;
      state.currentLecture = action.payload?.currentLecture!;
    });
    builder.addCase(getLecturesAsync.rejected, (state, action) => {
      state.lectureLoaded = true;
    });
  },
});

export const { setCurrentLecture, setCurrentVideo } = lectureSlice.actions;
