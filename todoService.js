/**
 * Simple Todo Service functions
 */

// Storage key for localStorage
const STORAGE_KEY = 'todos';

// Get todos from localStorage
function getTodos() {
  const todos = localStorage.getItem(STORAGE_KEY);
  return todos ? JSON.parse(todos) : [];
}

// Save todos to localStorage
function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Add a new todo
function addTodo(text) {
  if (!text.trim()) {
    alert('Task cannot be empty');
    return;
  }

  const newTodo = {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false
  };

  const todos = getTodos();
  saveTodos([...todos, newTodo]);
}

// Toggle todo completed status
function toggleTodo(id) {
  const todos = getTodos();
  
  const updatedTodos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  
  saveTodos(updatedTodos);
}

// Update todo text
function updateTodo(id, newText) {
  if (!newText.trim()) {
    alert('Task cannot be empty');
    return;
  }

  const todos = getTodos();
  
  const updatedTodos = todos.map(todo => 
    todo.id === id ? { ...todo, text: newText.trim() } : todo
  );
  
  saveTodos(updatedTodos);
}

// Delete a todo
function deleteTodo(id) {
  const todos = getTodos();
  const updatedTodos = todos.filter(todo => todo.id !== id);
  saveTodos(updatedTodos);
} 