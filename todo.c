#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_TASKS 100
#define TASK_LENGTH 100

// Structure to represent a task
struct Task {
    int id;
    char description[TASK_LENGTH];
    int completed;
};

// Function to display the menu
void displayMenu() {
    printf("\n1. Add Task\n");
    printf("2. Remove Task\n");
    printf("3. Display Tasks\n");
    printf("4. Mark Task as Completed\n");
    printf("5. Exit\n");
    printf("Choose an option: ");
}

// Function to add a task
void addTask(struct Task tasks[], int *taskCount) {
    if (*taskCount >= MAX_TASKS) {
        printf("\nTask list is full!\n");
        return;
    }

    struct Task newTask;
    newTask.id = *taskCount + 1;
    newTask.completed = 0;

    printf("\nEnter task description: ");
    getchar(); // to clear the newline from the buffer
    fgets(newTask.description, TASK_LENGTH, stdin);
    newTask.description[strcspn(newTask.description, "\n")] = '\0'; // Remove the newline character

    tasks[*taskCount] = newTask;
    (*taskCount)++;
    printf("\nTask added successfully!\n");
}

// Function to remove a task
void removeTask(struct Task tasks[], int *taskCount, int taskId) {
    int found = 0;
    for (int i = 0; i < *taskCount; i++) {
        if (tasks[i].id == taskId) {
            for (int j = i; j < *taskCount - 1; j++) {
                tasks[j] = tasks[j + 1];
            }
            (*taskCount)--;
            found = 1;
            printf("\nTask removed successfully!\n");
            break;
        }
    }
    if (!found) {
        printf("\nTask not found!\n");
    }
}

// Function to display all tasks
void displayTasks(struct Task tasks[], int taskCount) {
    if (taskCount == 0) {
        printf("\nNo tasks to display.\n");
        return;
    }

    printf("\nTasks:\n");
    for (int i = 0; i < taskCount; i++) {
        printf("ID: %d | Description: %s | Completed: %s\n", tasks[i].id, tasks[i].description, tasks[i].completed ? "Yes" : "No");
    }
}

// Function to mark a task as completed
void markTaskCompleted(struct Task tasks[], int taskCount, int taskId) {
    int found = 0;
    for (int i = 0; i < taskCount; i++) {
        if (tasks[i].id == taskId) {
            tasks[i].completed = 1;
            found = 1;
            printf("\nTask marked as completed!\n");
            break;
        }
    }
    if (!found) {
        printf("\nTask not found!\n");
    }
}

int main() {
    struct Task tasks[MAX_TASKS];
    int taskCount = 0;
    int choice, taskId;

    while (1) {
        displayMenu();
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                addTask(tasks, &taskCount);
                break;
            case 2:
                printf("\nEnter task ID to remove: ");
                scanf("%d", &taskId);
                removeTask(tasks, &taskCount, taskId);
                break;
            case 3:
                displayTasks(tasks, taskCount);
                break;
            case 4:
                printf("\nEnter task ID to mark as completed: ");
                scanf("%d", &taskId);
                markTaskCompleted(tasks, taskCount, taskId);
                break;
            case 5:
                printf("\nExiting program...\n");
                return 0;
            default:
                printf("\nInvalid choice. Please try again.\n");
        }
    }

    return 0;
}
