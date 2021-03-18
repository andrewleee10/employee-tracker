const { createConnection } = require('mysql2')
const { prompt } = require('inquirer')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/employees_db')


const viewAll = () => {
  db.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS 'department', CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id", (err, employees) => {
    if (err) { console.log(err) }
    console.table(employees)
    mainMenu()
  })
}

const viewDepartment = () => {
  db.query('SELECT * FROM employees LEFT JOIN departments ON employees.department_id = departments.id', (err, employees) => {
    if (err) { console.log(err) }
    console.table(employees)
    mainMenu()
  })
}

const mainMenu = () => {
  prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['View All Employees', 
        'View All Employees By Department', 
        'View All Employees By Manager', 
        'Add Employees', 
        'Remove Employees', 
        'Update Employee Role', 
        'Update Employee Manager', 
        'View All Roles', 
        'Add Role', 
        'Remove Role',
        'Exit']
    }
  ])
    .then ( ({choice}) => {
      switch(choice) {
        case 'View All Employees':
          viewAll()
          break
        case 'View All Employees By Department':
          viewDepartment()
          break
        case 'View All Employees By Manager':
          viewEmployees()
          break
        case 'Add Employees':
          addEmployee()
          break
        case 'Remove Employees':
          removeEmployee()
          break
        case 'Update Employee Role':
          updateEmployee()
          break
        case 'Update Employee Mangaer':
          updateEmployeeManager()
          break
        case 'View All Roles':
          viewAllRoles()
          break
        case 'Add Role':
          addRole()
          break
        case 'Remove Role':
          removeRole()
          break
        case 'Exit':
          process.exit()
          break
      }
    })
    .catch(err => console.log(err))
}

mainMenu()