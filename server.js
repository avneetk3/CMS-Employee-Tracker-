////add depedencies   
//add port and app
//const PORT = process.env.PORT || 3001;
const mysql = require('mysql2');
const mysql1 = require('mysql2/promise'); // to use promise
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db/connection');

console.log("---Welcome to employee management program---");
const startApp = async () => {
    try {
        let response = await inquirer.prompt({
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employees',
                'Add Departments',
                'Add Roles',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (response.choice) {
            case 'View Employees':
                viewEmployee();
               //viewAllEmployees();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':
                viewRoles();
                break;
             case 'Add Employees':
                addEmployee();
                break;
             case 'Add Departments':
                 addDepartment();
                 break;
            case 'Add Roles':
                 addRole();
                 break;
            // case 'Update Employee Role':
            //     updateEmployee();
            //     break
            case 'Exit':
                db.end();
                break;
        };
    } catch (err) {
        console.log(err);
        startApp();
    };
}

let employeeArray = [];
let query = '';
// Selection to view all of the employees.
const viewEmployee = async () => {
    console.log('Employee View');
    try {
         query = 'SELECT e.id AS ID, e.first_name AS firstname, e.last_name AS LastName, role.title AS Title, department.d_name AS Department, role.salary AS Salary, concat(m.first_name,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id' ;

        db.query(query, function (err, res) {
            if (err) throw err;
            //let employeeArray = [];
            res.forEach(employee => employeeArray.push(employee));
            console.table(employeeArray);
            startApp();
        });
    } catch (err) {
        console.log(err);
        startApp();
    };
}
//calling start func
startApp();
// view all departments.
const viewDepartments = async () => {
    console.log('Department View');
    try {
        query = 'SELECT * FROM department';
        db.query(query, function (err, res) {
            if (err) throw err;
            let departmentArray = [];
            res.forEach(department => departmentArray.push(department));
            console.table(departmentArray);
            startApp();
        });
    } catch (err) {
        console.log(err);
        startApp();
    };
}
// When View Role is selected, the job title, role id, the department that role belongs to, and the salary for that role

let rolesArray = [];// to store roles obtained in query object
const viewRoles = async () => {
    console.log('view Roles');
    try {
            query = 'SELECT role.title, role.id, role.salary, department.d_name FROM (role INNER JOIN department ON role.department_id = department.id);';
            db.query(query, function (err, res) {
            if (err) 
                throw err;
            res.forEach(role => rolesArray.push(role));
            console.table(rolesArray);
            startApp();
        });
    } catch (err) {
        console.log(err);
        startApp();
    };
}
// To add a new employee.
const addEmployee = async () => {
    try {
        console.log(" in addEmployee func");
        console.log("Current employees");
        //viewRoles();
        let roleTitleArray= [];
        let managerName = [];
        let stmt = "SELECT *  FROM role";
        db.query(stmt, function(err, results){
            if (err){
              throw err;
            }
        roleTitleArray= results.map(data=>data.title)
        console.log("Role Titles ="+ roleTitleArray);
       
       
        let stmt1 = "select distinct employee.id, employee.first_name, employee.last_name FROM employee INNER JOIN employee m  ON employee.id= m.manager_id;";

        db.query(stmt1, function(err, results1){
            if (err){
              throw err;
            }
        
       // let managerName= {};// creating object to store manager first name nad last name 
        //roleTitleArray
        console.log("Getting manager name");
        let mFName= [];
        let mLName = []
        mFName= results1.map(data=>data.first_name);
        mLName= results1.map(data => data.last_name);
        console.log("MFName"+ JSON.stringify(mFName));
        console.log("MLNme"+ JSON.stringify(mLName));
        let mFullName = [];
        for(let i=0; i< mFName.length && i< mLName.length;i++ )
            mFullName[i] = mFName[i] + " "+ mLName[i];
        console.log("Manager full name list"+ mFullName);
       /* let managerName = results1.map(data=>{
           let  container = {};
            container.first_name = data.first_name;
            container.last_name = data.last_name;
            //container = JSON.stringify(data.first_name)+" " + JSON.stringify(data.last_name);
            return JSON.stringify(container);
        })

        console.log("managerName ="+ (managerName));
        let managerName1 = []; 
        for(let i=0;i< managerName.length;i++)
        {
            managerName1[i]= managerName[i].first_name + " " +managerName[i].last_name;
        }
        console.log("managerName1" + managerName1);*/


    //}); //endof second select statement
        inquirer.prompt([
            {
                name: 'eFName',
                type: 'input',
                message: 'Please first name of the employee to be added:'
            },
            {
                name: 'eLName',
                type: 'input',
                message: 'Please last name of the employee to be added:'
            },
            {
                name:'eTitle',
                type: 'list',
                message: 'Please select role for this employee:',
                choices: (roleTitleArray)
            },
            {
                name : 'mName',
                type: 'list',
                message: "Please select the manager name",
                choices: (mFullName)
            }
        ]).then((response) =>
       {
        let val1 = `${response.eFName}`;
        let val2 = `${response.eLName}`;
        let val3;
        let val4;
        
        for (i = 0; i < results.length; i++)
       {
            if(`${response.eTitle}` == results[i].title)
           {
                val3 = results[i].id;
                console.log("Tilte value 3"+ val3 + "press ctl C")
               // exit;
           }
       }
       console.log(results1);
       console.log(`${response.mName}`);
       for (i = 0; i < results1.length; i++)
       {
            //if(((JSON.stringify(results1.first_name)).includes(`${response.mName}`)) && (JSON.stringify(results1.last_name)).includes(`${response.mName}`))
            //if(results1[i].first_name)
            if((`${response.mName}`.includes(mFName[i])) && (`${response.mName}`.includes(mLName[i])))
            
           {
                val4 = results1[i].id;
                console.log("value 4"+ val4 + "press ctl C")
               // exit;
           }
       }

        //stmt = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)';
        //let val = `${response.dName}`;
        const row =  db.query("INSERT INTO employee SET ?", {
            first_name: val1,
            last_name: val2,
            role_id: val3,
            manager_id: val4

        })

       // const row = db.query(stmt, val1,val2, val3);

        if(row)
        {
           // let depts = [];
            console.log("employee added "+ val1 + val2+ val3 + val4);
            query = 'SELECT * from employee';
            db.query(query, function(err, res)
            {
                if(err)
                    throw err;
                res.forEach(emp=> employeeArray.push(emp));
            });
            console.table(employeeArray);
        }
        startApp();
        });//end of then
       }); //end of first query
    });
      }
    //end of second query

    catch (err)
   {
        console.log(err);
        startApp();
    };
}
// Selection to add a new department.
let deptArray= [];
const addDepartment = async () => {
    try {
        console.log("in addDepartment");
        let response = await inquirer.prompt([
            {
                name: 'dName',
                type: 'input',
                message: 'Please enter department name to be added:'
            }
        ]);
        let stmt = 'INSERT INTO department (d_name) VALUES (?)';
        let val = `${response.dName}`;
        const row = db.query(stmt, val);

        if(row)
        {
           // let depts = [];
            console.log("deparmtent added "+ val);
            query = 'SELECT * from department';
            db.query(query, function(err, res)
            {
                if(err)
                    throw err;
                res.forEach(dept=> deptArray.push(dept));
            });
            viewDepartments();
            //console.table(deptArray);
        }
        
       // let result = 
       /* db.query(stmt, val, function(err, res)
        {
            if(err)
                throw err;
        res.forEach(dept=> deptArray.push(dept));
       // console.log('Row inserted:'+ result);
        console.table(deptArray);*/
        startApp();
       // });
    } catch (err)
   {
        console.log(err);
        startApp();
    };
}
    //startApp();}
// Selection to add a new role.
//let results = [];
/*function getDepName()
{
    let stmt = "SELECT *  FROM department";
    db.query(stmt, function(err, results){
        if (err){
          throw err;
        }
    return results;
}*/
const addRole = async () => {
   try {
        console.log(" in addRole func");
        console.log("Current Roles");
        //viewRoles();
        let stmt = "SELECT *  FROM department";
        db.query(stmt, function(err, results)
        {
            if (err){
              throw err;
            }
       // });
        let newRoleArray= [];
        console.log("Results"+JSON.stringify(results));
        newRoleArray= results.map(data=>data.d_name)
        console.log("newRoleArray ="+ newRoleArray);
       
        inquirer.prompt([
            {
                name: 'rName',
                type: 'input',
                message: 'Please enter role name to be added:'
            },
            {
                name:'rSalary',
                type: 'input',
                message: 'Please enter salary for this role'
            },
            {
                name : 'dName',
                type: 'list',
                message: "Please select the department name",
                choices: (newRoleArray)
            }
        ]).then((response) =>
       {
        let val1 = `${response.rName}`;
        let val2 = `${response.rSalary}`;
        let val3;
        /*let stmt1 = "SELECT id from deparment where d_name ="+`${response.dName}`;
        db.query(stmt1, function(err, result1)
        {
            if (err){
              throw err;
            }
       // });*/
        console.log(results);
       for (let i = 0; i < results.length; i++)
       {
           if(`${response.dName}` == results[i].d_name)

           {
                val3 = results[i].id;
                console.log("value3"+ val3 + "press ctl C")
                //exit;
           }
        }
        //stmt = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)';
        //let val = `${response.dName}`;
        const row =  db.query("INSERT INTO role SET ?", {
            title: val1,
            salary: val2,
            department_id: val3
        })

       // const row = db.query(stmt, val1,val2, val3);

        if(row)
        {
           // let depts = [];
            console.log("role added "+ val1);
            query = 'SELECT * from role';
            db.query(query, function(err, res)
            {
                if(err)
                    throw err;
                res.forEach(dept=> rolesArray.push(dept));
            });
            console.table(rolesArray);
        }
        startApp();
        });
      })
    } catch (err)
   {
        console.log(err);
        startApp();
    };
}