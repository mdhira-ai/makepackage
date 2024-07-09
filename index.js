#!/usr/bin/env node
const inquirer = require("inquirer");
const process = require("process");
const fs = require("fs");
const simpleGit = require("simple-git");


const prompt = inquirer.createPromptModule()

async function main() {
  const ans = await prompt([
    {
      type: "list",
      name: "name",
      message: "select a framework",
      choices: ["Electronjs with nextjs", "make a new package"],
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
      console.log("project already exist");

      process.exit(1);
    } else {
      fs.mkdirSync(projectname.name);

      if (ans == "Electronjs with nextjs") {
        console.log("downloading");

        git.clone("https://github.com/mdhira-ai/electronjs.nextjs", projectname.name);
      } else {
        console.log("downloading");

        git.clone("https://github.com/mdhira-ai/makepackage", projectname.name);
      }
    }

  }
  catch (err) {
    console.log(err);

    process.exit(1);
  }
}


main();

