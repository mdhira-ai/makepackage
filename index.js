#!/usr/bin/env node
const inquirer = require("inquirer");
const process = require("process");
const fs = require("fs");
const simpleGit = require("simple-git");

const prompt = inquirer.createPromptModule();

async function main() {
  const ans = await prompt([
    {
      type: "list",
      name: "name",
      message: "select a framework",
      choices: [
        "Electronjs with nextjs",
        "make a new package",
        "make a new CLI",
      ],
    },
  ]);

  checkanddownload(ans.name);
}

async function checkanddownload(ans) {
  const git = simpleGit();
  const questions = [
    {
      type: "input",
      name: "name",
      message: "Enter project name",
    },
  ];

  const projectname = await prompt(questions);

  //check if folder exist
  try {
    if (fs.existsSync(projectname.name)) {
      console.log(`project ${projectname.name} already exist`);

      process.exit(1);
    } else {
      fs.mkdirSync(projectname.name);

      if (ans == "Electronjs with nextjs") {
        git.clone(
          "https://github.com/mdhira-ai/electronjs.nextjs",
          projectname.name
        );
        console.log("Project created successfully");
      } else if (ans == "make a new package") {

        git.clone("https://github.com/mdhira-ai/dcomponents", projectname.name);
        console.log("Project created successfully");
      } else if (ans == "make a new CLI") {
        git.clone("https://github.com/mdhira-ai/makepackage", projectname.name);
        console.log("Project created successfully");
      } else {
        console.log("Invalid option");
        process.exit(1);
      }

      console.log(
        `cd ${projectname.name} \n` + "npm install\n" + "npm run dev" + "😊"
      );
    }
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
}

main();
