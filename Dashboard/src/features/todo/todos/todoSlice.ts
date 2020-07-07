import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TodoStore, TodoData } from './store';
import * as crypto from "crypto";

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as TodoStore,
  reducers: {
    addTodo(state:TodoStore, action:PayloadAction<string>) {
      const randomID = crypto.randomBytes(3 * 4).toString('base64');
      const newTodo = {
        id: randomID,
        text: action.payload,
        completed: false
      }
      state.push(newTodo);
    },
    deleteTodo(state:TodoStore, action:PayloadAction<string>) {
      return state.filter(todo => todo.id !== action.payload);
    },
    editTodo(state:TodoStore, action:PayloadAction<TodoData>) {
      return state.map(todo => {
        return todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo;
      });
    },
    completeTodo(state:TodoStore, action:PayloadAction<string>) {
      return  state.map(todo => {
        return todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo;
      });
    },
    completeAll(state:TodoStore, action:PayloadAction) {
      const areAllMarked = state.every(todo => todo.completed);
      return state.map(todo => {
        return {
          ...todo,
          completed: !areAllMarked
        };
      });
    },
    clearCompleted(state:TodoStore, action:PayloadAction) {
      return state.filter(todo => todo.completed === false);
    }
  }
})

export const { addTodo, deleteTodo, editTodo, completeTodo, completeAll, clearCompleted } = todosSlice.actions

export default todosSlice.reducer