export class UI {
    constructor() {
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
        this.employeesList = document.getElementById("employees");
        this.updateButton = document.getElementById("update");
    }

    addAllEmployeesToUI(emp) {
        let result = "";
        emp.forEach(employee => {
            result += `
            <tr>                           
                 <td>${employee.name}</td>
                 <td>${employee.department}</td>
                 <td>${employee.salary}</td>
                 <td>${employee.id}</td>
                 <td><a href="#" id = "update-employee" class= "btn btn-danger">Update</a></td>                    
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Delete</a></td>
            </tr>
            `;
        });
        this.employeesList.innerHTML = result;
    }
    addEmployeesToUI(employee) {
        this.employeesList.innerHTML += `
        <tr>                           
                 <td>${employee.name}</td>
                 <td>${employee.department}</td>
                 <td>${employee.salary}</td>
                 <td>${employee.id}</td>
                 <td><a href="#" id = "update-employee" class= "btn btn-danger">Update</a></td>
                 <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Delete</a></td>

        </tr>`;
    }

    clearInputs() {
        this.nameInput.value = "";
        this.departmentInput.value = "";
        this.salaryInput.value = "";
    }
    showAlert(type, content) {
        const firstCardBody = document.getElementById("firstCardBody");
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.textContent = content;

        firstCardBody.appendChild(alert);

        setTimeout(function () {
            alert.remove();
        }, 2000);
    }
    deleteEmployeeFromUI(element) {
        element.remove();
    }

    updateEmployeeFromUI(target) {
        if (this.updateButton.style.display === "none") {
            this.updateButton.style.display = "block";
            this.setEmployee(target);
        }
        else {
            this.updateButton.style.display = "none";
            this.clearInputs();
        }
    }

    setEmployee(target) {
        const children = target.children;

        this.nameInput.value = children[0].textContent;
        this.departmentInput.value = children[1].textContent;
        this.salaryInput.value = children[2].textContent;

    }

    updateEmployeeOnUI(employee, parent) {
        parent.innerHTML = `
        <tr>                           
                 <td>${employee.name}</td>
                 <td>${employee.department}</td>
                 <td>${employee.salary}</td>
                 <td>${employee.id}</td>
                 <td><a href="#" id = "update-employee" class= "btn btn-danger">update</a></td>  
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">delete</a></td>

        </tr>
        `;
        this.clearInputs();
    }

}

