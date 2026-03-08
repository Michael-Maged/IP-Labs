// Model: Task class
class Task {
    constructor(description, completed = false, timestamp = Date.now(), id = null) {
        this.id = id || Task.generateId();
        this.description = description;
        this.completed = completed;
        this.timestamp = timestamp;
    }
    static generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Model: TaskManager class
class TaskManager {
    constructor() {
        this.tasks = [];
        this.load();
    }
    addTask(description) {
        const task = new Task(description);
        this.tasks.push(task);
        this.save();
        return task;
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.save();
    }
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.save();
        }
    }
    editTask(id, newDesc) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.description = newDesc;
            this.save();
        }
    }
    save() {
        localStorage.setItem('pro-tasks', JSON.stringify(this.tasks));
    }
    load() {
        const data = localStorage.getItem('pro-tasks');
        if (data) {
            this.tasks = JSON.parse(data).map(t => new Task(t.description, t.completed, t.timestamp, t.id));
        }
    }
    filter(status) {
        if (status === 'all') return this.tasks;
        if (status === 'completed') return this.tasks.filter(t => t.completed);
        if (status === 'incomplete') return this.tasks.filter(t => !t.completed);
        return this.tasks;
    }
    sort(by) {
        if (by === 'alpha') {
            return [...this.tasks].sort((a, b) => a.description.localeCompare(b.description));
        } else if (by === 'time') {
            return [...this.tasks].sort((a, b) => a.timestamp - b.timestamp);
        }
        return this.tasks;
    }
}

// View & Controller
const taskManager = new TaskManager();
let currentFilter = 'all';
let currentSort = 'time';

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterAll = document.getElementById('filterAll');
const filterCompleted = document.getElementById('filterCompleted');
const filterIncomplete = document.getElementById('filterIncomplete');
const sortAlpha = document.getElementById('sortAlpha');
const sortTime = document.getElementById('sortTime');

function renderTasks() {
    let tasks = taskManager.filter(currentFilter);
    tasks = taskManager.sort(currentSort).filter(t => tasks.includes(t));
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        li.innerHTML = `
            <span class="task-desc">${task.description}</span>
            <span class="timestamp">${new Date(task.timestamp).toLocaleString()}</span>
            <div class="task-actions">
                <button class="action-btn complete" title="Toggle Complete">${task.completed ? '❌' : '✔️'}</button>
                <button class="action-btn edit" title="Edit">✏️</button>
                <button class="action-btn delete" title="Delete">🗑️</button>
            </div>
        `;
        // Toggle complete
        li.querySelector('.complete').onclick = () => {
            taskManager.toggleTask(task.id);
            renderTasks();
        };
        // Edit task
        li.querySelector('.edit').onclick = () => {
            const newDesc = prompt('Edit task:', task.description);
            if (newDesc !== null && newDesc.trim() !== '') {
                taskManager.editTask(task.id, newDesc.trim());
                renderTasks();
            }
        };
        // Delete task
        li.querySelector('.delete').onclick = () => {
            li.style.background = '#ffe6e6';
            setTimeout(() => {
                taskManager.deleteTask(task.id);
                renderTasks();
            }, 300);
        };
        taskList.appendChild(li);
    });
}

addTaskBtn.onclick = () => {
    const desc = taskInput.value.trim();
    if (desc) {
        taskManager.addTask(desc);
        taskInput.value = '';
        renderTasks();
    }
};
taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTaskBtn.onclick();
});

filterAll.onclick = () => { currentFilter = 'all'; renderTasks(); };
filterCompleted.onclick = () => { currentFilter = 'completed'; renderTasks(); };
filterIncomplete.onclick = () => { currentFilter = 'incomplete'; renderTasks(); };
sortAlpha.onclick = () => { currentSort = 'alpha'; renderTasks(); };
sortTime.onclick = () => { currentSort = 'time'; renderTasks(); };

// Initial render
renderTasks();
