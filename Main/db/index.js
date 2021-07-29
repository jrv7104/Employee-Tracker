const connection = require("./connection");

class DB {

    constructor(connection) {
    this.connection = connection;
}

findEmployees()  {
    return this.connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
}
findPossibleManagers(employeeID) {
    return this.connection.query(
        'SELECT id, first_name, last_name FROM employe WHERE id != ?',
        employeeId
    );
}

createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
}

deleteEMPLOYEE (employeeId) {
    return this.connection.query(
        "DELETE FROM employee WHERE id = ?",
    );
}

updateEMPLOYEE(employeeID, roleID) {
    return this.connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [roleId, employeeId]
    );
}

findRole() {
    return this.connection.query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;""
    );
}

createROLE(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
}

deleteRole(roleID) {
    return this.connection.query("DELETE FROM role WHERE id = ?", roleID);
}

findDepartments() {
    return this.connection.query(
        "SELECT department.id, department.name FROM department;"
        );
}

viewDepartmentBudget