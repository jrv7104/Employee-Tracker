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