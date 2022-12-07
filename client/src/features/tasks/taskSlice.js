import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  tasks: [],
  pending: false,
  fulfilled: false,
  rejected: false,
  message: "",
};

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.createTask(taskData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.getTasks(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.deleteTask(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => {
      state.tasks = [];
      state.pending = false;
      state.fulfilled = false;
      state.rejected = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.pending = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.pending = false;
        state.fulfilled = true;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.pending = false;
        state.rejected = true;
        state.message = action.payload;
      })
      .addCase(getTasks.pending, (state) => {
        state.pending = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.pending = false;
        state.fulfilled = true;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.pending = false;
        state.rejected = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.pending = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        state.pending = false;
        state.fulfilled = true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.pending = false;
        state.rejected = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
