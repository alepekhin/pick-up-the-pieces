import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TodoStore, TodoData } from './store';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo(state:TodoStore, action:PayloadAction<string>) {
      const newTodo = {
        id: 1,
        text: action.payload,
        completed: false
      }
      state.push(newTodo);
    },
    deleteTodo(state:TodoStore, action:PayloadAction<TodoData>) {
      state.filter(todo => todo.id !== action.payload);
    },
    editTodo(state:TodoStore, action:PayloadAction<TodoData>) {
      state.map(todo => {
        return todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo;
      });
    },
    completeTodo(state:TodoStore, action:PayloadAction<TodoData>) {
      state.map(todo => {
        return todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo;
      });
    },
    completeAll(state:TodoStore, action:PayloadAction<TodoData>) {
      const areAllMarked = state.every(todo => todo.completed);
      state.map(todo => {
        return {
          ...todo,
          completed: !areAllMarked
        };
      });
    },
    clearCompleted(state:TodoStore, action:PayloadAction<TodoData>) {
      state.filter(todo => todo.completed === false);
    }
  }
})

export const { addTodo, deleteTodo, editTodo, completeTodo, completeAll, clearCompleted } = todosSlice.actions

export default todosSlice.reducer