const connection = require("./connection");

class DB {

    constructor(connection) {
    this.connection = connection;
    }

findEmployees()  {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }
findPossibleManagers(employeeID) {
    return this.connection.promise().query(
        'SELECT id, first_name, last_name FROM employee WHERE id != ?',
        employeeID
        );
    }

createEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }

deleteEmployee (employeeId) {
    return this.connection.promise().query(
        "DELETE FROM employee WHERE id = ?", employeeId);
        
    }

updateEmployee(employeeID, roleID) {
    return this.connection.promise().query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [roleID, employeeID]
        );
    }

    updateEmployeeManager(employeeID, managerID) {
        return this.connection.promise().query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerID, employeeID]
            );
        }

findRole() {
    return this.connection.promise().query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

createRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
    }

deleteRole(roleID) {
    return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleID);
    }

findDepartments() {
    return this.connection.promise().query(
        "SELECT department.id, department.name FROM department;"
        );
    }

viewDepartmentBudget() {
    return this.connection.promise().query(
        "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }

newDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
    }

deleteDepartment(departmentID) {
    return this.connection.promise().query(
        "DELETE FROM department WHERE id = ?",
        departmentID
        );
    }

findEmployeesByDepartment(departmentID) {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee left join role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
        departmentID
        );
    }

findEmployeeByManager(managerID) {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
        managerID
        );
    }
}

module.exports = new DB(connection);