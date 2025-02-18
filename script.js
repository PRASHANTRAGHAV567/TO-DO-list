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

// Render tasks to the page
function renderTasks() {
    taskList.innerHTML = ''; // Clear existing tasks
    if (tasks.length === 0) {
        noTasksMessage.classList.remove('hidden');
    } else {
        noTasksMessage.classList.add('hidden');
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.setAttribute('data-id', task.id);
            li.classList.toggle('completed', task.completed);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('click', () => toggleCompletion(task.id));

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            li.appendChild(checkbox);
            li.appendChild(taskText);

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

// Enable drag-and-drop functionality
taskList.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.add('dragging');
    }
});

taskList.addEventListener('dragend', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.remove('dragging');
        const allTasks = Array.from(taskList.children);
        tasks = allTasks.map(task => {
            const taskId = parseInt(task.getAttribute('data-id'));
            const taskText = task.querySelector('span').textContent;
            const taskCompleted = task.querySelector('input').checked;
            return { id: taskId, text: taskText, completed: taskCompleted };
        });
        saveTasks();
    }
});

taskList.addEventListener('dragover', function(e) {
    e.preventDefault();
    const draggingTask = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(taskList, e.clientY);
    if (afterElement == null) {
        taskList.appendChild(draggingTask);
    } else {
        taskList.insertBefore(draggingTask, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
