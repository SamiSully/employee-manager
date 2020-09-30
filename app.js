const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
console.log(__dirname);
const OUTPUT_DIR = path.resolve(__dirname, "output");
console.log(OUTPUT_DIR);
const outputPath = path.join(OUTPUT_DIR, "team.html");
console.log(outputPath);
const render = require("./lib/htmlRenderer");
const { inherits } = require("util");

var team = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const startingQuestion = [
  {
    type: "confirm",
    name: "addingTeamMember",
    message: "Would you like to add a new team member?",
    default: true,
  },
];
const memberQuestion = [
  {
    type: "list",
    name: "employeeType",
    message: "What team member position would you like to add?",
    choices: ["Manager", "Engineer", "Intern"],
  },
];
const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the manager's name?",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    type: "input",
    name: "ID",
    message: "What is the manager's id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the manager's email?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the manager's office number?",
  },
];
const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the engineer's name?",
  },
  {
    type: "input",
    name: "ID",
    message: "What is the engineer's id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the engineer's email?",
  },
  {
    type: "input",
    name: "github",
    message: "What is the engineer's github?",
  },
];
const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the intern's name?",
  },
  {
    type: "input",
    name: "ID",
    message: "What is the intern's id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the intern's email?",
  },
  {
    type: "input",
    name: "school",
    message: "What is the intern's school?",
  },
];

function init() {
    console.log("Please generate your team below:");
  inquirer.prompt(startingQuestion).then(function (data) {
    console.log(data);
    if (data.addingTeamMember === true) {
      memberType();
    } else {
      endProgram();
    }
  });
}

function memberType() {
  inquirer.prompt(memberQuestion).then(function (data) {
    if (data.employeeType === "Manager") {
      managerEntry();
    } else if (data.employeeType === "Intern") {
      internEntry();
    } else if (data.employeeType === "Engineer") {
      engineerEntry();
    }
  });
}
function managerEntry() {
  inquirer.prompt(managerQuestions).then(function (data) {
    var newManager = new Manager(
      data.name,
      data.ID,
      data.email,
      data.officeNumber
    );
    team.push(newManager);
    console.log(newManager);
    init();
  });
}
function internEntry() {
  inquirer.prompt(internQuestions).then(function (data) {
    var newIntern = new Intern(data.name, data.ID, data.email, data.school);
    team.push(newIntern);
    console.log(newIntern);
    init();
  });
}
function engineerEntry() {
  inquirer.prompt(engineerQuestions).then(function (data) {
    var newEngineer = new Engineer(data.name, data.ID, data.email, data.github);
    team.push(newEngineer);
    console.log(newEngineer);
    init();
  });
}

function endProgram() {
  fs.writeFile(outputPath, render(team), function (err) {
    if (err) {
      console.log(err);
    }
    console.log("Your page has been printed!");
  });
}

init();
