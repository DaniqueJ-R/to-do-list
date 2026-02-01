    const allBtn = document.getElementById("all");
    const activeBtn = document.getElementById("active");
    const completeBtn = document.getElementById("complete");
    const addBtn = document.getElementById("addBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const items = document.querySelectorAll(".task-item");
    const task = window.localStorage.getItem("task");

// Load tasks when page loads
window.onload = function() {
  loadTasks();
};

// Function to save tasks to localStorage
function saveTasks() {
  const items = document.querySelectorAll('.task-item');
  const tasks = [];
  
  items.forEach(item => {
    // Get the text (skip the checkbox and delete button)
    const text = item.childNodes[1].textContent; // The text node
    const completed = item.classList.contains('completed');
    
    tasks.push({ text: text, completed: completed });
  });
  
  // Save as JSON string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const tasksJSON = localStorage.getItem('tasks');
  
  if (tasksJSON) {
    const tasks = JSON.parse(tasksJSON);
    
    tasks.forEach(taskData => {
      // Recreate each task (similar to your addTask function)
      createTaskElement(taskData.text, taskData.completed);
    });
  }
}

// Helper function to create a task element
function createTaskElement(text, isCompleted = false) {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "checkBox";
  checkBox.checked = isCompleted;
  
  const item = document.createElement("li");
  item.className = "task-item show";
  if (isCompleted) {
    item.classList.add("completed");
  }
  
  item.appendChild(checkBox);
  
  checkBox.addEventListener("click", function () {
    if (this.checked) {
      item.classList.add("completed");
    } else {
      item.classList.remove("completed");
    }
    saveTasks(); // Save whenever status changes
  });
  
  const taskText = document.createTextNode(text);
  item.appendChild(taskText);
  
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  item.appendChild(deleteBtn);
  
  deleteBtn.addEventListener("click", function () {
    taskList.removeChild(item);
    saveTasks(); // Save after deleting
  });
  
  taskList.appendChild(item);
}


      const addTask = () => {
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.className = "checkBox";
        const item = document.createElement("li"); // fix, run per click not ponce page loads
        item.className = "task-item show";
        item.appendChild(checkBox);
        const value = taskInput.value.trim(); // ai

          if (value === "") {
          alert("Please enter text");
          return;
        }
        
        taskInput.value = "";


        // 2. When user clicks a task, mark it as complete (toggle)
        checkBox.addEventListener("click", function () {
          if (this.checked) {
            console.log("TRUE");
            console.log(item);
            item.classList.add("completed");
          } else {
            console.log("FALSE");
            item.classList.remove("completed");
          }
        });

        if (value === "") {
          // ai
          alert("Please enter text");
          return; // ai
        } else {
          const task = document.createTextNode(value);
          item.appendChild(task);
          taskList.appendChild(item);
          window.localStorage.setItem('taskList', taskList)
          taskInput.value = ""; // ai
        saveTasks(); // Save after adding

        }

        // delete button
      // 3. When user clicks delete button, remove the task
        const deleteBtn = document.createElement("btn");
        const textBtn = document.createTextNode("Delete");
        deleteBtn.appendChild(textBtn);
        deleteBtn.className = "delete-btn";
        item.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", function () {
            item.id = "delete";
            const deleteThis = document.getElementById("delete");
            taskList.removeChild(deleteThis);
            localStorage.removeItem(deleteThis);
          });
      };

      addBtn.addEventListener("click", addTask);


      allBtn.addEventListener("click", function () {
      const items = document.querySelectorAll(".task-item");

        if (allBtn.classList !== 'active'){
        completeBtn.classList.remove('active')
        activeBtn.classList.remove('active')
        allBtn.classList.add('active')
        }

        items.forEach(item => {
          if (item.classList.contains('hide')) {
          item.classList.remove('hide')
          }
        })
      });

        completeBtn.addEventListener('click', function () {
          const items = document.querySelectorAll('.task-item');

          if (completeBtn.classList !== 'active') {
              completeBtn.classList.add('active')
              activeBtn.classList.remove('active')
              allBtn.classList.remove('active')            
          }

          items.forEach(item => {
            if (item.classList.contains('completed')) {
              item.classList.remove('hide')
            } else {
              item.classList.add('hide')
            }
          })
        })

        activeBtn.addEventListener('click', function () {
          const items = document.querySelectorAll('.task-item');

          if (activeBtn.classList !== 'active') {
            activeBtn.classList.add('active')
            completeBtn.classList.remove('active')
            allBtn.classList.remove('active')
          }

          items.forEach(item => {
            // if (item.classList !== 'completed'){   inital error made
            if (!item.classList.contains('completed')){
              item.classList.remove('hide')
            } else {
              item.classList.add('hide')
            }
          })
        })