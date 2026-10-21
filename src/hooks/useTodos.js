import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

export const useTodos = () => {
  // Re-renders automatically whenever the todos table changes
  const todos = useLiveQuery(() => db.todos.toArray(), [], []);

  const addTodo = (text) => db.todos.add({ text, createdAt: Date.now() });
  const removeTodo = (id) => db.todos.delete(id);

  return { todos, addTodo, removeTodo };
};
