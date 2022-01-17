//add depedencies   
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
                'Add Departments',
                'Add Roles',
                'Add Employees',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (response.choice) {
            case 'View Employees':
                viewEmployee();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':
                viewRoles();
                break;
             case 'Add Departments':
                 addDepartment();
                 break;
            case 'Add Roles':
                 addRole();
                 break;
            case 'Add Employees':
                 addEmployee();
                 break;            
            case 'Update Employee Role':
                 updateEmployee();
                 break;
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
// To view all of the employees.
const viewEmployee = async () => {
    console.log('in viewEmployee');
    try {
         query = 'SELECT e.id AS ID, e.first_name AS firstname, e.last_name AS LastName, role.title AS Title, department.d_name AS Department, role.salary AS Salary, concat(m.first_name,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id' ;

        db.query(query, function (err, res) {
            if (err) throw err;
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
    console.log('in viewDepartments ');
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
    console.log('in view Roles');
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
            if((`${response.mName}`.includes(mFName[i])) && (`${response.mName}`.includes(mLName[i])))
            
           {
                val4 = results1[i].id;
                console.log("value 4"+ val4 + "press ctl C")
               // exit;
           }
       }
        const row =  db.query("INSERT INTO employee SET ?", {
            first_name: val1,
            last_name: val2,
            role_id: val3,
            manager_id: val4

        })
        if(row)
        {
            console.log("employee added "+ val1 + val2+ val3 + val4);
            /*query = 'SELECT * from employee';
            db.query(query, function(err, res)
            {
                if(err)
                    throw err;
                res.forEach(emp=> employeeArray.push(emp));  //due ot this employee added twice
            });
            console.table(employeeArray);*/
        }
        startApp();
        });//end of then
       }); //end of second query
    });//end of second query
      }   //end of try 

    catch (err)
   {
        console.log(err);
        startApp();
    };
}
// To add a new department.
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
            console.log("deparmtent added "+ val);
            /*query = 'SELECT * from department';
            db.query(query, function(err, res)
            {
                if(err)
                    throw err;
                res.forEach(dept=> deptArray.push(dept));
            });
            viewDepartments();*/
        }
        startApp();
    } catch (err)
   {
        console.log(err);
        startApp();
    };
}
const addRole = async () => {
   try {
        console.log(" in addRole func");
        //viewRoles();
        let stmt = "SELECT *  FROM department";
        db.query(stmt, function(err, results)
        {
            if (err){
              throw err;
            }
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
        const row =  db.query("INSERT INTO role SET ?", {
            title: val1,
            salary: val2,
            department_id: val3
        })

      
        if(row)
        {
            console.log("role added "+ val1);
            /*query = 'SELECT * from role';
            db.query(query, function(err, res)
            {
                if(err)
                    throw err;
                res.forEach(dept=> rolesArray.push(dept));
            });
            console.table(rolesArray);*/
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
const updateEmployee = async () => {
    try {
        console.log('in  Update employee');
        stmt = "SELECT id, first_name, last_name FROM employee"
        db.query(stmt, function(err, results){
            if (err){
              throw err;
            }
        let eFName= [];
        let eLName = []
        eFName= results.map(data=>data.first_name);
        eLName= results.map(data => data.last_name);
        console.log("EFName"+ JSON.stringify(eFName));
        console.log("ELNme"+ JSON.stringify(eLName));
        let eFullName = [];
        for(let i=0; i< eFName.length && i< eLName.length;i++ )
              eFullName[i] = eFName[i] + " "+ eLName[i];
        console.log("employee full name list"+ eFullName);
           
        
       //now work on getting role id
       stmt1 = "SELECT * FROM role";
       db.query(stmt1, function(err, results1){
           if (err){
             throw err;
           }

       let roleTitleArray= [];
       roleTitleArray= results1.map(data=>data.title)
       console.log("Role Titles ="+ roleTitleArray);
    
        inquirer.prompt([
            {
                name: 'eName',
                type: 'list',
                message: "Select employee name for updating role",
                choices:eFullName
                
            },
            {
                name: 'rTitle',
                type: 'list',
                message: 'Please select the role for update.',
                choices: roleTitleArray
            }
        ]).then((response) =>
        {
            console.log("selected name of employee"+ `${response.eName}`);
            let val1;
            for (let i = 0; i < results.length; i++)
            {
                if((`${response.eName}`.includes(eFName[i])) && (`${response.eName}`.includes(eLName[i])))
            
                {
                    val1 = results[i].id;
                    console.log("employee id selected"+ val1 + "press ctl C")
               // exit;
                }
            }      
            let val2;
            for(let i=0;i< results1.length;i++)
            {
                if(`${response.rTitle}` == results1[i].title)
                    val2 = results1[i].id;
            }
            console.log("Selected employee id and name" + val1+ " " + `${response.eName}`);
            console.log("Select role id and name ",val2+ " " + `${response.rTitle}`);
        let data = [val2, val1];
        let stmt2 = "UPDATE employee SET role_id = ? WHERE  id = ?";
        db.query(stmt2, data, (error, results, fields) => {
            if (error){
              return console.error(error.message);
            }
            console.log('Rows affected:', results.affectedRows);
          });
        startApp();
        })//end of response
        })// end of second query
    })//end of first query
    } catch (err) {
        console.log(err);
        startApp();
    };
}
