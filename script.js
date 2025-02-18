/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background-color: #f3f3f3;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.todo-container {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h1 {
    color: #333;
    margin-bottom: 20px;
}

input {
    width: 75%;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
    font-size: 16px;
}

button:hover {
    background-color: #45a049;
}

#taskList {
    list-style-type: none;
    margin-top: 20px;
    padding: 0;
}

#taskList li {
    padding: 12px;
    margin: 8px 0;
    background-color: #f4f4f4;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;
}

#taskList li:hover {
    background-color: #e7f7e7;
}

button.edit-btn {
    background-color: #ffa500;
}

button.edit-btn:hover {
    background-color: #ff8c00;
}

button.delete-btn {
    background-color: #e74c3c;
}

button.delete-btn:hover {
    background-color: #c0392b;
}

.hidden {
    display: none;
}

#noTasksMessage {
    color: #aaa;
    font-style: italic;
    margin-top: 20px;
}

