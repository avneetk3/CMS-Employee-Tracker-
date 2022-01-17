INSERT INTO department (d_name)
VALUES ('Management');
INSERT INTO department (d_name)
VALUES ('Accounts');
INSERT INTO department (d_name)
VALUES ('Sales');
INSERT INTO department (d_name)
VALUES ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 240000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Accounts person', 180000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 160000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('HR Person', 150000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 500000, null);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Avneet', 'Kaur', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Amarjit', 'Singh', 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Gurpreet', 'Kaur', 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jasmeet', 'Singh', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ritika', 'Sharma', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'Liu', 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Rochelle', 'Smith', 4, 2);
