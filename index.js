const inquirer = require('inquirer')
const fs = require('fs')
const Employee = require('./lib/employee.js')
const Manager = require('./lib/manager.js')
const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')
const teamArray = []



const createManager = () => {
        return inquirer.prompt ([
            {
                type: 'input',
                message: 'Enter Manager Name',
                name: 'managerName',
                
            },
            {
                type: 'input',
                message: 'Enter Manger employee ID',
                name: 'managerID',

            },
            {
                type: 'input',
                message: 'Enter Manager e-mail address.',
                name: 'managerEmail',
            },
            {
                type: 'input',
                message: 'Enter Manager office number.',
                name: 'managerOffice',
            },

        ])
        .then((newManager) => {
            const { managerName, managerID, managerEmail, managerOffice } = newManager
            const manager = new Manager(managerName, managerID, managerEmail, managerOffice)
            teamArray.push(manager)
            createTeam()
        })
        
    }

function createTeam() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to add additional team members?',
            choices: [
                'Yes, an engineer.',
                'Yes, an intern.',
                'No, my team is finished.'
            ],
            name: "teamSelection"
        }
        ])
            .then((addMemberChoice) => {
                switch (addMemberChoice.teamSelection) {
                    case 'Yes, an engineer.':
                        addEngineer()
                        break
                    case 'Yes, an intern.':
                        addIntern()
                        break
                    case 'No, my team is finished.':
                        pushTeam()
                        console.log(`
                        ********
                        You have created your team! Please check the dist folder for your new website.
                        ********
                        `);      
                        return teamArray
                        
                        
                }
            })
}

function addEngineer() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter Name',
            name: 'engineerName',
        },
        {
            type: 'input',
            message: 'Enter employee ID',
            name: 'engineerID',
        },
        {
            type: 'input',
            message: 'Enter e-mail address.',
            name: 'engineerEmail',
        },
        {
            type: 'input',
            message: 'Enter github profile.',
            name: 'engineerGithub',
        },
    ])
        .then((newEngineeer) => {
            const { engineerName, engineerID, engineerEmail, engineerGithub } = newEngineeer
            let engineer = new Engineer(engineerName, engineerID, engineerEmail, engineerGithub)
            teamArray.push(engineer)
            createTeam()
        })

}
function addIntern() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter Name',
            name: 'internName',
        },
        {
            type: 'input',
            message: 'Enter employee ID',
            name: 'internID',
        },
        {
            type: 'input',
            message: 'Enter e-mail address.',
            name: 'internEmail',
        },
        {
            type: 'input',
            message: 'Enter school that intern attends.',
            name: 'internSchool',
        },
    ])
        .then((newIntern) => {
            const { internName, internId, internEmail, internSchool } = newIntern
            let intern = new Intern(internName, internId, internEmail, internSchool)
            teamArray.push(intern)
            createTeam()
        })

}





function pushTeam() {

const siteArray = []

const htmlHead = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Staff Organizer</title>

</head>
<body style="background-color: white;">
<h1 class="col-12 bg-primary" style="height:100px; color: white; border-bottom: 4px black; border-style: outset; "><span class="d-flex justify-content-center mt-3 m-4">My Team </span></h1>
    <section class="col-12 d-flex justify-content-center flex-wrap text-center">
`
siteArray.push(htmlHead)

teamArray.forEach((element) => {
    let card = `
    <div class="card m-4" style="width: 18rem; border: 2px outset black;">
        <div>
            <div class="card-top bg-info" style="color: white; border-bottom: 3px solid black;" >
            <h2 class="card-title">${element.name} </h2>
            <h3 class="card-title pb-3" style="color: white;">${element.role}</h3>
        </div>
        <div class="card-bottom mx-3">
            <p>Employee ID: ${element.ID}</p>
            <a href="mailto:${element.email}" class="card-link">E-mail</a>`
            
            
    if (`${element.role}` === "Manager") {
        card +=`<p>Office: ${element.officeNumber}</p>`
    }
    if (`${element.role}` === "Engineer") {
        card +=`<a href="https://www.github.com/${element.gitHub}" class="card-link">Github</a>`
    }
    if (`${element.role}` === "Intern") {
        card += `<p>Institution: ${element.school}</p>`
    }
    card +=`
        </div>
        </div>
    </div>
    `
    siteArray.push(card)
})

const htmlFoot = `
</section>
</body>
</html> 
`
siteArray.push(htmlFoot)

fs.writeFile(`./dist/created_site.html`, siteArray.join(""), (err) => {
    console.log(err)
})

}

createManager()