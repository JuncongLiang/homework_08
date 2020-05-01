const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// This file will generate the final HTML. You don't need to touch this at all!
const render = require("./lib/htmlRenderer");

// This will be an array of all team member objects created
const teamMembers = [];

function createTeam() {

    inquirer
        .prompt([

            {
                type: "list",
                message: "What is your role?",
                name: "role",
                choices: ["Manager", "Engineer", "Intern", "Completed"]
            }

        ]).then(newMember => {
            if (newMember.role !== 'Completed') {

                inquirer
                    .prompt([


                        {
                            type: "input",
                            message: "What is your name?",
                            name: "name"
                        },

                        {
                            type: "input",
                            message: "What is your employee ID?",
                            name: "employeeID"
                        },

                        {
                            type: "input",
                            message: "What is your email?",
                            name: "email"
                        },
                    ])
                    .then(basicInfo => {

                        switch (newMember.role) {
                            case "Manager":
                                addManager(basicInfo);
                                break;
                            case "Engineer":
                                addEngineer(basicInfo);
                                break;
                            case "Intern":
                                addIntern(basicInfo);
                                break;
                            // case  "Completed":
                            // const teamPage = render(teamMembers);
                            // console.log(teamPage)
                            // write teampge to file
                            // break

                        }
                    })
            } else {

                const teamPageHTML = render(teamMembers);
                // console.log(teamPage)
                //create team html page with results and save file

                fs.writeFile('output/teamPage.html', teamPageHTML, function (err) {
                    if (err) return console.log(err);
                    console.log('Your team is successfully created!');
                });
            }
        })

    function addManager(basicInfo) {

        inquirer.prompt([

            {
                type: "input",
                message: "What is your office number?",
                name: "officeNumber"
            }

        ]).then(response => {
            console.log(response);

            let newManager = new Manager(basicInfo.name, basicInfo.employeeID, basicInfo.email, response.officeNumber)

            teamMembers.push(newManager)

            createTeam();

        })
    }

    function addEngineer(basicInfo) {

        inquirer.prompt([

            {
                type: "input",
                message: "What is your GitHub username?",
                name: "gitHub"
            }
        ]).then(response => {
            console.log(response);

            let newEngineer = new Engineer(basicInfo.name, basicInfo.employeeID, basicInfo.email, response.gitHub)

            teamMembers.push(newEngineer)

            createTeam();
        })
    }

    function addIntern(basicInfo) {

        inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your school?",
                    name: "school"
                }

            ]).then(response => {
                console.log(response);

                let newIntern = new Intern(basicInfo.name, basicInfo.employeeID, basicInfo.email, response.school)

                teamMembers.push(newIntern)

                createTeam();
            })
    }
}


createTeam();