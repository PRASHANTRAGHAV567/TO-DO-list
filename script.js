// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const noTasksMessage = document.getElementById('noTasksMessage');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on page load
window.onload = function() {
    renderTasks();
};

// Add task functionality
addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();

    if (taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = ''; // Clear input field
        saveTasks();
        renderTasks();
    }
});

// Delete task functionality
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

// Toggle task completion
function toggleCompletion(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Edit task functionality
function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        const newText = prompt("Edit your task:", task.text);
        if (newText) {
            task.text = newText;
            saveTasks();
            renderTasks();
        }
    }
}

// Render tasks to the page
function renderTasks() {
    taskList.innerHTML = ''; // Clear existing tasks
    if (tasks.length === 0) {
        noTasksMessage.classList.remove('hidden');
    } else {
        noTasksMessage.classList.add('hidden');
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.toggle('completed', task.completed);
            li.setAttribute('data-id', task.id);

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            li.appendChild(taskText);

            const toggleButton = document.createElement('button');
            toggleButton.textContent = task.completed ? 'Undo' : 'Complete';
            toggleButton.classList.add('toggle-btn');
            toggleButton.addEventListener('click', () => toggleCompletion(task.id));
            li.appendChild(toggleButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', () => editTask(task.id));
            li.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => deleteTask(task.id));
            li.appendChild(deleteButton);

            taskList.appendChild(li);
        });
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
