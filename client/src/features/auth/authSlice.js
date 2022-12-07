import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  pending: false,
  fulfilled: false,
  rejected: false,
  message: "",
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      return await authService.signup(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (user, thunkAPI) => {
    try {
      return await authService.signin(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signout = createAsyncThunk("auth/signout", async () => {
  authService.signout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.pending = false;
      state.fulfilled = false;
      state.rejected = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.pending = false;
      state.fulfilled = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.user = null;
      state.pending = false;
      state.rejected = true;
      state.message = action.payload;
    });
    builder.addCase(signin.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.pending = false;
      state.fulfilled = true;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.user = null;
      state.pending = false;
      state.rejected = true;
      state.message = action.payload;
    });
    builder.addCase(signout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
