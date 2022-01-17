# 12 SQL: Employee Tracker

# Target:
 to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

ACCEPTANCE CRITERIA:
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

#Links to code:#
https://github.com/avneetk3/CMS-Employee-Tracker-/tree/master

#Links to video#
https://drive.google.com/file/d/1EXk05xA7nzKPnhSuzQvtWoA-9B_3bxQ9/view?usp=sharing

#Techology used#
MySQL and Node JS 

#Tools used#
MySQL client (MySQL2)
Node js (terminal) , MySQL
Visual Studio code terminal and power shell

#Dependencies
Install Node Js 
Install MySql
Inquirer
Console Table to view table output

#Steps to execute the code#
Install mySQL
in terminal mysql -u root -p ,login with root password
run commands: source db/db.sql
source db/schema.sql
source db./seeds.sql
 use employee_DB
 select * from employee;
 select * from role;
 select * from department;
 exit 
 to exit from SQL
 Executing application: 

 Initialize node Js and create gitignore
 for initilizing node in terminal execute command:
 npm init --y
  
INSTALL npm PACKAGES :
npm install express mysql2
npm install inquirer

To execute the code: npm start
#Screen Shot of the app#

![image](https://user-images.githubusercontent.com/92407474/149709889-54597423-6b4a-48cd-afde-86ce20003539.png)


Created by Avneet Kaur , git hub: https://github.com/avneetk3
 
