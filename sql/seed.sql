USE employees_db;
INSERT INTO departments (name)
VALUES ('Sales'),
	  ('Engineering'),
    ('Finance'),
    ('Legal');

USE employees_db;
INSERT INTO roles (title, salary, department_id)
VALUE ('Sales Lead', 100000, 1),
	  ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3), 
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);
    
USE employees_db;
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
	  ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);


SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS 'departmnet', CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees manager ON manager.id = employees.manager_id;