import Dexie from 'dexie';

export const db = new Dexie('todos-in-peace');

// ++id keeps insertion order; createdAt is indexed for date-based queries
db.version(1).stores({
  todos: '++id, createdAt'
});

// Runs once, when the database is first created: import todos saved in localStorage.
// The localStorage key is left in place as a backup.
db.on('populate', (tx) => {
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem('todos')) || [];
  } catch {
    saved = [];
  }
  const todos = saved.map((t) =>
    typeof t === 'string' ? { text: t, createdAt: null } : { text: t.text, createdAt: t.createdAt ?? null }
  );
  if (todos.length) tx.table('todos').bulkAdd(todos);
});
