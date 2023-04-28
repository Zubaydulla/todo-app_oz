import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todosList: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setAddTodos: (state, action) => {
      state.todosList.push(action.payload);
    },
    setDeleteTodos: (state, action) => {
      state.todosList = state.todosList.filter(
        (todo) => todo._id !== action.payload
      );
    },
    setResetTodos: (state) => {
      state.todosList = [];
    },
  },
});

export const { setAddTodos, setDeleteTodos, setResetTodos } = todoSlice.actions;
export const todosList = (state) => state.todos.todosList;

export default todoSlice.reducer;
