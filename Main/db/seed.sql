USE employees;

INSERT INTO department
(name)
VALUES
('Sales')
('Finance')
('Engineering')
('Legal');

INSERT INTO role
(title, salary, department_id)
VALUES
('Sales Representative', 70000, 1),
('Sales Manager', 90000, 1),
('Accountant', 10000, 2),
('Accounting Manager', 14000, 2),
('Software Engineer', 11000, 3),
('Lead Engineer', 14000, 3),
('Lawyer', 16000, 4),
('Legal Team Manager', 200000, 4);

INSERT INTO employee
VALUES
    (first_name, last_name, role_id, manager_id)
    ('Jake', 'Peralta', 1, NULL,)
    ('Doug', 'Judy', 2, 2,)
    ('Rosa', 'Diaz', 3, NULL,)
    ('Amy', 'Santiago', 4, 4,)
    ('Gina', 'Linetti', 5, NULL,)
    ('Terry', 'Jeffords', 6, 6,)
    ('Madeline', 'Wuntch', 7, NULL,)
    ('Raymond', 'Holt', 8, 8,);