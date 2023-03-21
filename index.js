// Get the necessary DOM elements
const newItemInput = document.getElementById("new-item");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

// Initialize the todo list
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render the todo list
renderTodos();

// Listen for the add button click event
addButton.addEventListener("click", addItem);

function addItem() {
  // Get the value of the input field
  const newItemValue = newItemInput.value.trim();

  // If the input field is empty, do nothing
  if (!newItemValue) {
    return;
  }

  // Create a new todo item object
  const newItem = {
    text: newItemValue,
  };

  // Add the new todo item to the beginning of the array
  todos.unshift(newItem);

  // Update localStorage with the new todo list
  localStorage.setItem("todos", JSON.stringify(todos));

  // Reset the input field
  newItemInput.value = "";

  // Re-render the todo list
  renderTodos();
}

function removeItem(index) {
  // Remove the todo item from the array
  todos.splice(index, 1);

  // Update localStorage with the new todo list
  localStorage.setItem("todos", JSON.stringify(todos));

  // Re-render the todo list
  renderTodos();
}

function editItem(index, text) {
  // Update the text of the todo item
  todos[index].text = text;

  // Update localStorage with the new todo list
  localStorage.setItem("todos", JSON.stringify(todos));

  // Re-render the todo list
  renderTodos();
}

function renderTodos() {
  // Clear the current contents of the todo list
  todoList.innerHTML = "";

  // Render each todo item in the array
  todos.forEach((todo, index) => {
    // Create a new list item element
    const listItem = document.createElement("li");

    // Set the text of the list item
    listItem.innerText = todo.text;

    // Add a delete button to the list item
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => removeItem(index));
    listItem.appendChild(deleteButton);

    // Add an edit button to the list item
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", () => {
      const newText = prompt("Enter new text:", todo.text);
      if (newText) {
        editItem(index, newText.trim());
      }
    });
    listItem.appendChild(editButton);

    // Add the list item to the todo list
    todoList.appendChild(listItem);
  });
}
