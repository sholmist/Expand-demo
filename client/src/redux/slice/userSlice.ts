import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { notification } from "antd";
import agent from "../../actions/agent";
import { Course } from "../../models/course";
import { Login, Register, User } from "../../models/user";
import { setBasket } from "./basketSlice";

interface UserState {
  user: User | null;
  userCourses: Course[];
  unpublishedCourses: Course[];
}

const initialState: UserState = {
  user: null,
  userCourses: [],
  unpublishedCourses: [],
};

export const fetchCurrentUser = createAsyncThunk<User>(
  "user/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDto = await agent.Users.currentUser();
      const { basket, courses, ...user } = userDto;
      if (basket) {
        thunkAPI.dispatch(setBasket(basket));
      }

      if (courses) {
        thunkAPI.dispatch(setUserCourses(courses));
      }

      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) {
        return false;
      }
    },
  }
);

export const signInUser = createAsyncThunk<User, Login>(
  "user/signin",
  async (data, thunkAPI) => {
    try {
      const userData = await agent.Users.login(data);
      const { basket, ...user } = userData;

      if (basket) {
        thunkAPI.dispatch(setBasket(basket));
      }
      localStorage.setItem("user", JSON.stringify(userData));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const registerUser = createAsyncThunk<User, Register>(
  "user/register",
  async (data, thunkAPI) => {
    try {
      const user = await agent.Users.register(data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addRole = createAsyncThunk<void>(
  "user/addRole",
  async (_, thunkAPI) => {
    try {
      await agent.Users.addRole();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getUnpublishedCourses = createAsyncThunk<Course[]>(
  "user/getUnpublishedCourses",
  async (_, thunkAPI) => {
    try {
      return await agent.Users.unpublishedCourses();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      let claims = JSON.parse(atob(action.payload.token.split(".")[1]));
      let roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
    },
    setUserCourses: (state, action) => {
      state.userCourses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      notification.error({
        message: "Session has been expired",
      });
    });
    builder.addCase(getUnpublishedCourses.fulfilled, (state, action) => {
      state.unpublishedCourses = action.payload;
    });
    builder.addMatcher(
      isAnyOf(
        signInUser.fulfilled,
        registerUser.fulfilled,
        fetchCurrentUser.fulfilled
      ),
      (state, action) => {
        let claims = JSON.parse(atob(action.payload.token.split(".")[1]));
        let roles =
          claims[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        state.user = {
          ...action.payload,
          roles: typeof roles === "string" ? [roles] : roles,
        };
      }
    );
    builder.addMatcher(
      isAnyOf(signInUser.rejected, registerUser.rejected),
      (_, action) => {
        throw action.payload;
      }
    );
  },
});

export const { signOut, setUser, setUserCourses } = userSlice.actions;
