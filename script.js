// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Add task functionality
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create 'Complete' button
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
        });
        li.appendChild(completeButton);

        // Create 'Remove' button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            taskList.removeChild(li);
        });
        li.appendChild(removeButton);

        // Add new task to the list
        taskList.appendChild(li);
        taskInput.value = ''; // Clear input field
    }
});
