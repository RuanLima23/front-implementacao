'use client';
import { useEffect, useState } from 'react';
import api from '../services/api';

type Todo = {
  id: number;
  title: string;
  createdAt: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await api.get('/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    await api.post('/todos', { title });
    setTitle('');
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>📝 To-Do List</h1>

      <div style={styles.card}>
        <div style={styles.form}>
          <input
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite sua tarefa"
          />
          <button style={styles.addButton} onClick={addTodo}>
            ➕ Adicionar
          </button>
        </div>

        {todos.length === 0 ? (
          <p style={styles.emptyText}>Nenhuma tarefa ainda.</p>
        ) : (
          <ul style={styles.list}>
            {todos.map((todo) => (
              <li key={todo.id} style={styles.listItem}>
                <span>{todo.title}</span>
                <button style={styles.removeButton} onClick={() => deleteTodo(todo.id)}>
                  🗑️ Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    background: 'linear-gradient(to right, #141e30, #243b55)',
    color: '#f0f0f0',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#ffffff',
    textShadow: '0 0 10px #00000050',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(6px)',
  },
  form: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  input: {
    flex: 1,
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    border: '1px solid #4e4e4e',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
  },
  addButton: {
    padding: '0.6rem 1rem',
    backgroundColor: '#00bcd4',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    backgroundColor: '#2d2d2d',
    marginBottom: '0.75rem',
    padding: '1rem',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  },
  removeButton: {
    padding: '0.5rem 0.9rem',
    backgroundColor: '#ff5252',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.7,
    fontStyle: 'italic',
  },
};
