// ===============================
// MANAGER DASHBOARD DATA
// ===============================

const projects = [
    {
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        progress: '',
        status: ""
    }

   
];


// ========================================
// TASK DATA
// ========================================

const tasks = [

    {
        title: "",
        description: "",
        assignedTo: "",
        priority: "",
        startDate: "",
        endDate: "",
        status: "",
        progress: ''
    }

    
];

// ===============================
// UPDATE DASHBOARD CARDS
// ===============================

function updateCards() {

    const totalProjects = projects.length;

    const totalTasks = tasks.length;

    const inProgress = tasks.filter(
        task => task.status === "In Progress"
    ).length;

    const completed = tasks.filter(
        task => task.status === "Completed"
    ).length;

    const pending = tasks.filter(
        task => task.status === "Pending"
    ).length;


    const cards = document.querySelectorAll(".card h1");

    if (cards.length >= 5) {

        cards[0].textContent = totalProjects;

        cards[1].textContent = totalTasks;

        cards[2].textContent = inProgress;

        cards[3].textContent = completed;

        cards[4].textContent = pending;
    }
}


// ===============================
// PROJECT TABLE
// ===============================

function loadProjects() {

    const tbody = document.querySelector(
        ".project-section tbody"
    );

    if (!tbody) return;

    tbody.innerHTML = "";

    projects.forEach((project, index) => {

        let statusClass = "";

        if (project.status === "In Progress") {
            statusClass = "progress-status";
        }

        else if (project.status === "Pending") {
            statusClass = "pending-status";
        }

        else if (project.status === "Completed") {
            statusClass = "completed";
        }


        const row = document.createElement("tr");

        row.innerHTML = `
            
            <td>${index + 1}</td>

            <td>
                <strong>${project.name}</strong>
            </td>

            <td>${project.description}</td>

            <td>${project.startDate}</td>

            <td>${project.endDate}</td>

            <td>

                <div class="progress">

                    <div 
                        class="progress-bar"
                        style="width:${project.progress}%">
                    </div>

                </div>

                ${project.progress}%

            </td>

            <td>

                <span class="status ${statusClass}">
                    ${project.status}
                </span>

            </td>

            <td>

                <button 
                    class="view-btn"
                    onclick="viewProject(${index})">

                    View

                </button>

            </td>
        `;

        tbody.appendChild(row);
    });
}


// ===============================
// TASK TABLE
// ===============================

function loadTasks() {

    const tbody = document.querySelector(
        ".task-table tbody"
    );

    if (!tbody) return;

    tbody.innerHTML = "";


    tasks.forEach((task, index) => {

        let priorityClass = "";

        if (task.priority === "High") {
            priorityClass = "high";
        }

        else if (task.priority === "Medium") {
            priorityClass = "medium";
        }


        let statusClass = "";

        if (task.status === "Completed") {
            statusClass = "completed";
        }

        else if (task.status === "In Progress") {
            statusClass = "progress-status";
        }

        else {
            statusClass = "pending-status";
        }


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${index + 1}</td>

            <td>
                <strong>${task.title}</strong>
            </td>

            <td>${task.description}</td>

            <td>
                <span class="avatar-name">
                    ${task.assignedTo}
                </span>
            </td>

            <td>

                <span class="${priorityClass}">
                    ${task.priority}
                </span>

            </td>

            <td>${task.startDate}</td>

            <td>${task.endDate}</td>

            <td>

                <span class="status ${statusClass}">
                    ${task.status}
                </span>

            </td>

            <td>

                <div class="progress">

                    <div 
                        class="progress-bar"
                        style="width:${task.progress}%">
                    </div>

                </div>

                ${task.progress}%

            </td>

            <td class="actions">

                <i 
                    class="fa-solid fa-eye"
                    title="View"
                    onclick="viewTask(${index})">
                </i>

                <i 
                    class="fa-solid fa-pen"
                    title="Edit"
                    onclick="editTask(${index})">
                </i>

                <i 
                    class="fa-solid fa-trash"
                    title="Delete"
                    onclick="deleteTask(${index})">
                </i>

            </td>
        `;

        tbody.appendChild(row);
    });
}


// ===============================
// VIEW PROJECT
// ===============================

function viewProject(index) {

    const project = projects[index];

    alert(
        "PROJECT DETAILS\n\n" +

        "Project Name: " +
        project.name +

        "\n\nDescription: " +
        project.description +

        "\n\nStart Date: " +
        project.startDate +

        "\nEnd Date: " +
        project.endDate +

        "\n\nProgress: " +
        project.progress + "%"

        + "\nStatus: " +
        project.status
    );
    window.location.href="project.html";
}


// ===============================
// VIEW TASK
// ===============================

function viewTask(index) {

    const task = tasks[index];

    alert(
        "TASK DETAILS\n\n" +

        "Task Title: " +
        task.title +

        "\n\nDescription: " +
        task.description +

        "\n\nAssigned To: " +
        task.assignedTo +

        "\nPriority: " +
        task.priority +

        "\nStatus: " +
        task.status +

        "\nProgress: " +
        task.progress + "%"
    );
}


// ===============================
// EDIT TASK
// ===============================

function editTask(index) {

    const task = tasks[index];

    const newStatus = prompt(
        "Enter Status:\n\n" +
        "Pending\n" +
        "In Progress\n" +
        "Completed",

        task.status
    );


    if (newStatus === "Pending") {

        task.status = "Pending";

        task.progress = 0;
    }

    else if (newStatus === "In Progress") {

        task.status = "In Progress";

        task.progress = 60;
    }

    else if (newStatus === "Completed") {

        task.status = "Completed";

        task.progress = 100;
    }

    else {

        alert("Invalid status!");

        return;
    }


    updateCards();

    loadTasks();
}


// ===============================
// DELETE TASK
// ===============================

function deleteTask(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );


    if (confirmDelete) {

        tasks.splice(index, 1);

        updateCards();

        loadTasks();

        alert("Task deleted successfully!");
    }
}


// ===============================
// CREATE NEW TASK BUTTON
// ===============================

const newTaskButton =
    document.querySelector(".new-task-btn");


if (newTaskButton) {

    newTaskButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "createtask.html";

        }
    );
}


// ===============================
// VIEW BUTTONS
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCards();

        loadProjects();

        loadTasks();

    }
);