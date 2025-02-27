/**
 * Todo App - Main application logic
 */

// DOM Elements
const inputElement = document.getElementById('input');
const addBtnElement = document.getElementById('addBtn');
const taskListElement = document.getElementById('taskList');

// Add event listeners
addBtnElement.addEventListener('click', addNewTodo);
inputElement.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addNewTodo();
  }
});

// Display todos when page loads
displayTodos();

// Add a new todo
function addNewTodo() {
  const todoText = inputElement.value;
  addTodo(todoText);
  inputElement.value = '';
  displayTodos();
}

// Display all todos
function displayTodos() {
  const todos = getTodos();
  
  if (todos.length === 0) {
    taskListElement.innerHTML = '<p class="text-center">No tasks yet!</p>';
    return;
  }
  
  let todosHtml = '';
  
  todos.forEach(todo => {
    todosHtml += `
      <li class="todo-item flex justify-between items-center p-2">
        <div>
          <input 
            type="checkbox" 
            data-id="${todo.id}" 
            ${todo.completed ? 'checked' : ''}
            onchange="toggleTodoStatus(this)"
            class="mr-2"
          />
          <span class="${todo.completed ? 'line-through' : ''}">${todo.text}</span>
        </div>
        <div>
          <button onclick="editTodo('${todo.id}')" class="p-1 mx-1">
            <i class="fa-solid fa-pen-to-square" style="color: #685997;"></i>
          </button>
          <button onclick="removeTodo('${todo.id}', ${todo.completed})" class="p-1 mx-1">
            <i class="fa-solid fa-trash" style="color: #df2b0c"></i>
          </button>
        </div>
      </li>
    `;
  });
  
  taskListElement.innerHTML = todosHtml;
}

// Toggle todo status
function toggleTodoStatus(checkbox) {
  const todoId = checkbox.dataset.id;
  toggleTodo(todoId);
  displayTodos();
}

// Edit a todo
function editTodo(todoId) {
  const todos = getTodos();
  const todo = todos.find(t => t.id === todoId);
  
  if (todo) {
    const newText = prompt('Edit task:', todo.text);
    if (newText !== null) {
      updateTodo(todoId, newText);
      displayTodos();
    }
  }
}

// Remove a todo
function removeTodo(todoId, isCompleted) {
  if (!isCompleted) {
    alert('Please mark the task as completed before deleting');
    return;
  }
  
  if (confirm('Are you sure you want to delete this task?')) {
    deleteTodo(todoId);
    displayTodos();
  }
}

/**
 * Show a notification to the user
 * @param {string} message - Notification message
 */
function showNotification(message) {
  alert(message);
}

// Initialize the app
function init() {
  displayTodos();
}

init();
