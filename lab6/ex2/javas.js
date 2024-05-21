function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value;
    if (taskText.trim() === "") {
        alert("Будь ласка, введіть завдання!");
        return;
    }
    var taskList = document.getElementById("taskList");
    var li = document.createElement("li");
    li.className = "task-item";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Видалити";
    deleteButton.className = "delete-btn";

    var taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = taskText;

    li.appendChild(checkbox);
    li.appendChild(taskSpan); 
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = "";

    checkbox.onclick = function() {
        if (checkbox.checked) {
            li.classList.add("completed");
        } else {
            li.classList.remove("completed");
        }
        saveTasks();
    };

    deleteButton.onclick = function() {
        li.classList.add("deleting");
        setTimeout(function() {
            li.remove();
        }, 500);
    };

    taskSpan.setAttribute("contenteditable", true);
}




function sortTasksByStatus() {
    var taskList = document.getElementById("taskList");
    var tasks = Array.from(taskList.children);

    tasks.sort(function(a, b) {
        var statusA = a.classList.contains("completed");
        var statusB = b.classList.contains("completed");
        if (statusA && !statusB) {
            return 1;
        } else if (!statusA && statusB) {
            return -1;
        } else {
            return 0;
        }
    });

    tasks.forEach(function(task) {
        taskList.appendChild(task);
    });
}
