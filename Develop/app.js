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
              message: "What type of team member are you?",
              name: "role",
              choices: ["Manager", "Engineer", "Intern", "Completed"]
          }

      ]).then (newMember => {
        switch(newMember.role) {
            case "Manager":
                addManager();
                break;
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            case  "Completed":
                render(teamMembers);
                break

        }
    })
}

