const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();

function init() {
    loadPrompts();
}

function loadPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees By Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "View All Possible Managers",
                    value: "VIEW_POSSIBLE_MANAGERS"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update Employee Manager",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Delete Department",
                    value: "DELETE_DEPARTMENT"
                },
                {
                    name: "View Total Utilized Budget By Department",
                    value: "VIEW_BUDGET_BY_DEPARTMENT"
                },
                {
                    name: "Exit",
                    value: "EXIT"
                }
            ]
        }
]).then(res => {
    let choice = res.choice;
    switch(choice) {
        case "VIEW_EMPLOYEES":
            viewEmployees();
            break;
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            findEmployeesByDepartment();
            break;
        case "VIEW_EMPLOYEES_BY_MANAGER":
                findEmployeeByManager();
                break;
        case "ADD_EMPLOYEE":
                addEmployee();
                break;
        case "REMOVE_EMPLOYEE":
                deleteEmployee();
                break;
        case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
        case "UPDATE_EMPLOYEE_MANAGER":
                updateEmployeeManager();
                break;
        case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
        case "ADD_DEPARTMENT":
                addDepartment();
                break;
        case "REMOVE_DEPARTMENT":
                deleteDepartment();
                break;
        case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
                viewDepartmentBudget();
                break;
        case "VIEW_ROLES":
                viewRoles();
                break;
        case "ADD_ROLE":
                addRole();
                break;
        case "REMOVE_ROLE":
                removeRole();
                break;
            default:
                exit();
        }
    }
)
}

function viewEmployees() {
    db.findEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
    })
    .then(() => loadPrompts());
}

function findEmployeesByDepartment() {
    db.findDepartments().then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map (({ id, name }) => ({
            name: name,
            value: id
        }));

        prompt([
            {
                type: "list",
                name: "departmentID",
                message: "What department do you want to see?",
                choices: departmentChoices
            }
        ])
        .then(res => db.findEmployeesByDepartment(res.departmentID)). then (([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => loadPrompts())
    });
}

function findEmployeeByManager() {
    db.findEmployees().then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
          }));

          prompt([
            {
                type: "list",
                name: "managerId",
                message: "Which employee do you want to see?",
                choices: managerChoices
              }
            ])
            .then(res => db.findEmployeeByManager(res.managerId))
            .then(([rows]) => {
              let employees = rows;
              console.log("\n");
              if (employees.length === 0) {
                console.log("The selected employee is not available");
              } else {
                console.table(employees);
              }
            })
            .then(() => loadPrompts())
        });   
    }

    function deleteEmployee() {
        db.findEmployees()
          .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }));
      
            prompt([
              {
                type: "list",
                name: "employeeId",
                message: "Which employee will be deleted?",
                choices: employeeChoices
              }
            ])
              .then(res => db.deleteEmployee(res.employeeId))
              .then(() => console.log("Removed employee from the database"))
              .then(() => loadMainPrompts())
          })
      }

      function updateEmployee() {
        db.findAllEmployees()
          .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }));
      
            prompt([
              {
                type: "list",
                name: "employeeId",
                message: "Which employee's role will change?",
                choices: employeeChoices
              }
            ])
              .then(res => {
                let employeeId = res.employeeId;
                db.findAllRoles()
                  .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                      name: title,
                      value: id
                    }));
      
                    prompt([
                      {
                        type: "list",
                        name: "roleId",
                        message: "Which role will the employee take?",
                        choices: roleChoices
                      }
                    ])
                      .then(res => db.updateEmployee(employeeId, res.roleId))
                      .then(() => console.log("Updated employee's role"))
                      .then(() => loadMainPrompts())
                  });
              });
          })
      }
      
      function updateEmployeeManager() {
        db.findAllEmployees()
          .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }));
      
            prompt([
              {
                type: "list",
                name: "employeeId",
                message: "Which employee's manager needs to be changed?",
                choices: employeeChoices
              }
            ])
              .then(res => {
                let employeeId = res.employeeId
                db.findPossibleManagers(employeeId)
                  .then(([rows]) => {
                    let managers = rows;
                    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                      name: `${first_name} ${last_name}`,
                      value: id
                    }));
      
                    prompt([
                      {
                        type: "list",
                        name: "managerId",
                        message:
                          "Which employee will you choose for the manager for the employee?",
                        choices: managerChoices
                      }
                    ])
                      .then(res => db.updateEmployeeManager(employeeId, res.managerId))
                      .then(() => console.log("Updated employee's manager"))
                      .then(() => loadMainPrompts())
                  })
              })
          })
      }

function addRole() {
    db.findAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
  
        prompt([
          {
            name: "title",
            message: "What is the title of the role?"
          },
          {
            name: "salary",
            message: "How much is the role worth?"
          },
          {
            type: "list",
            name: "department_id",
            message: "What department does the role go to?",
            choices: departmentChoices
          }
        ])
          .then(role => {
            db.createRole(role)
              .then(() => console.log(`Added ${role.title} to the database`))
              .then(() => loadMainPrompts())
          })
      })
  }

function viewRoles () {
    db.findAllRoles()
      .then(([rows]) => {
        let roles = rows;
        console.log("\n");
        console.table(roles);
      })
      .then(() => loadMainPrompts());
  }

function deleteRole() {
    db.findAllRoles()
      .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id
        }));
  
        prompt([
          {
            type: "list",
            name: "roleId",
            message:
              "What role will be deleted? (Warning: This will also delete employees attached with the role)",
            choices: roleChoices
          }
        ])
          .then(res => db.removeRole(res.roleId))
          .then(() => console.log("Role removed from the database"))
          .then(() => loadMainPrompts())
      })
  }

  function addDepartment() {
    prompt([
      {
        name: "name",
        message: "What is the department name?"
      }
    ])
      .then(res => {
        let name = res;
        db.createDepartment(name)
          .then(() => console.log(`Added ${name.name} to the database`))
          .then(() => loadMainPrompts())
      })
  }

  function deleteDepartment() {
    db.findDepartments()
      .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
  
        prompt({
          type: "list",
          name: "departmentId",
          message:
            "Which department will be deleted? (Warning: This will also delete associated roles and employees for selected departments)",
          choices: departmentChoices
        })
          .then(res => db.removeDepartment(res.departmentId))
          .then(() => console.log(`Removed department from the database`))
          .then(() => loadMainPrompts())
      })
  }

  function viewDepartments() {
    db.findAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadMainPrompts());
  }

  function viewDepartmentBudget() {
    db.viewDepartmentBudgets()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => loadMainPrompts());
  }

  function addEmployee () {
    prompt([
      {
        name: "first_name",
        message: "First name?"
      },
      {
        name: "last_name",
        message: "Last name?"
      }
    ])
      .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
  
        db.findRole()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));

            prompt({
                type: "list",
                name: "roleId",
                message: "What role will the employee have?",
                choices: roleChoices
              })
                .then(res => {
                  let roleId = res.roleId;
    
                  db.findEmployees()
                    .then(([rows]) => {
                      let employees = rows;
                      const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                      }));
    
                      managerChoices.unshift({ name: "None", value: null });
    
                      prompt({
                        type: "list",
                        name: "managerId",
                        message: "Who is the manager of the employee?",
                        choices: managerChoices
                      })
                        .then(res => {
                          let employee = {
                            manager_id: res.managerId,
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName
                          }
    
                          db.createEmployee(employee);
                        })
                        .then(() => console.log(
                          `Added ${firstName} ${lastName} to the database`
                        ))
                        .then(() => loadPrompts())
                    })
                })
            })
        })
    }

    function exit() {
        console.log("Have a great day!");
        process.exit();
    }