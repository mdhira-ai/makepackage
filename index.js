#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const simpleGit = require('simple-git');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const repoUrl = 'https://github.com/mdhira-ai/dcomponents';

function removeGitDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeGitDirectory(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

function createProject(projectName) {
  if (fs.existsSync(projectName)) {
    console.error(`Error: Directory '${projectName}' already exists.`);
    process.exit(1);
  }

  console.log(`Creating a new project in ${projectName}...`);

  // Clone the repository
  // execSync(`git clone ${repoUrl} ${projectName}`);
  await git.clone(repoUrl,projectName).then(() => console.log('Repository cloned successfully.'))
    .catch((err) => console.error('Error cloning repository:', err));



  // Remove the .git directory
  const gitDir = path.join(projectName, '.git');
  removeGitDirectory(gitDir);

  // Initialize a new git repository
  execSync('git init', { cwd: projectName });

  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { cwd: projectName });

  console.log(`
Project created successfully!

To get started:
  cd ${projectName}
  npm start
`);

  rl.close();
}

console.log('Welcome to create-my-project!');
rl.question('What is the name of your project? ', (projectName) => {
  createProject(projectName);
});