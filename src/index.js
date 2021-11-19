import { Request } from "./requests";
import { UI } from "./ui";

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateButton = document.getElementById("update");

const requests = new Request("http://localhost:3000/employee");
const ui = new UI();

let updateState = null;

eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", loadAllEmployees);
    form.addEventListener("submit", addEmployee);
    employeesList.addEventListener("click", updateOrDelete);
    updateButton.addEventListener("click", updateEmployee);
}

function loadAllEmployees() {
    requests.get()
        .then(emp => {
            ui.addAllEmployeesToUI(emp)
        }).catch(err => console.log(err));
}

function addEmployee(e) {
    const employeeName = nameInput.value.trim();
    const departmentName = departmentInput.value.trim();
    const salaryValue = salaryInput.value.trim();

    if (employeeName.value == "" || departmentName == "" || salaryValue == "") {
        ui.showAlert("danger", "Please fill in the blanks !");
    } else {
        requests.post({ name: employeeName, department: departmentName, salary: salaryValue })
            .then(emp => {
                ui.addEmployeesToUI(emp);
            }).catch(err => console.log(err));
    }

    ui.clearInputs();
    e.preventDefault();
}


function updateOrDelete(e) {

    if (e.target.id == "delete-employee") {
        deleteEmployee(e.target);
    }
    if (e.target.id == "update-employee") {
        updateEmployeeAndUI(e.target.parentElement.parentElement);
    }

}

function deleteEmployee(targetEmployee) {
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;
    requests.delete(id)
        .then(deleted => {
            ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement)
            ui.showAlert("success", "The employee was successfully deleted.");
        }).catch(err => console.log(err))
}

function updateEmployeeAndUI(targetElement) {
    ui.updateEmployeeFromUI(targetElement);

    if (updateState === null) {
        updateState = {
            updateId: targetElement.children[3].textContent,
            updateParent: targetElement
        }
    }
    else {
        updateState = null;
    }
}

function updateEmployee() {
    if (updateState) {
        const data = { name: nameInput.value.trim(), department: departmentInput.value.trim(), salary: Number(salaryInput.value.trim()) }
        console.log(data);
        requests.put(updateState.updateId, data)
            .then(updatedEmployee => {
                ui.updateEmployeeOnUI(updatedEmployee, updateState.updateParent);
                console.log(updatedEmployee);
            }).catch(err => console.log(err));

    }
}
