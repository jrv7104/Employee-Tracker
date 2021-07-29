CREATE DATABASE employees;

USE EMPLOYEES;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) UNIQUE NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    INDEX dep_ind (department_id),
    
);