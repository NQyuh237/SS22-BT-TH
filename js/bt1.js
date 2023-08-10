
let todoInput = document.getElementById("todo-input");
let addButton = document.getElementById("add-button");
let todoList = document.getElementById("todo-list");

let todos = [];

// hiển thị danh sách nv
function displayTodos() {

    // Xóa toàn bộ nội dung ul
    todoList.innerHTML = "";

    // Duyệt todos và tạo li cho mỗi nv
    for (let i = 0; i < todos.length; i++) {

        // Tạo một li
        let li = document.createElement("li");
        li.className = "todo-item";

        // Tạo input kiểu checkbox để đánh dấu hoàn thành nv
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todos[i].completed;

        // Tạo span để hiển thị tên nv
        let span = document.createElement("span");
        span.textContent = todos[i].name;

        // Tạo button để chỉnh sửa nv
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        // Tạo button để xóa nv
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        // Thêm vào phần tử li
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        // Thêm click cho checkbox để đổi trạng thái hoàn thành của nv
        checkbox.addEventListener("click", function () {
            // Lấy chỉ số của nv trong mảng todos
            let index = Array.prototype.indexOf.call(todoList.children, this.parentNode);

            // Đổi giá trị của thuộc tính completed của nv
            todos[index].completed = !todos[index].completed;

            saveTodos();
        });

            // Thêm click cho edit button
        editButton.addEventListener("click", function () {
            // Lấy nv trong todos
            let index = Array.prototype.indexOf.call(todoList.children, this.parentNode);

            // Lấy tên nv hiện tại
            let oldName = todos[index].name;

            // Nhập tên nv mới
            let newName = prompt("Enter a new name for the task", oldName);

            // Nếu tên mới không rỗng và khác tên cũ, thì cập nhật tên nv
            if (newName && newName !== oldName) {
                todos[index].name = newName;

                displayTodos();

                saveTodos();
            }
        });

        // Thêm click cho delete button
        deleteButton.addEventListener("click", function () {
            // Lấy chỉ số của nv trong todos
            let index = Array.prototype.indexOf.call(todoList.children, this.parentNode);

            // Xóa nv khỏi todos
            todos.splice(index, 1);

            displayTodos();

            saveTodos();
        });

        // Thêm li vào ul
        todoList.appendChild(li);
    }
}

function saveTodos() {
    let json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
}

function loadTodos() {
    let json = localStorage.getItem("todos");

    // Nếu chuỗi JSON không rỗng, thì chuyển đổi thành mảng và gán cho biến todos
    if (json) {
        todos = JSON.parse(json);
    }
}

// Thêm sự kiện click cho add button để thêm nv mới vào danh sách
addButton.addEventListener("click", function () {
    // Lấy giá trị nhập vào từ người dùng
    let todoName = todoInput.value;

    // Nếu giá trị không rỗng, thì tạo một đối tượng todo mới và thêm vào mảng todos
    if (todoName) {
        let todo = {
            name: todoName,
            completed: false
        };
        todos.push(todo);

        // Xóa giá trị nhập vào input
        todoInput.value = "";

        // Hiển thị lại ds các nv
        displayTodos();
        saveTodos();
    }
});

loadTodos();