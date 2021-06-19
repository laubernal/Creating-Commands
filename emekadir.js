#!/usr/bin/env node

const fs = require('fs');
const dirName = process.argv[2];
const chalk = require('chalk');

fs.mkdir(dirName, { recursive: false }, (err) => {
  if (err) {
    console.error(chalk.red.bold(`The directory: "${dirName}" already exists`));
  } else {
    console.log(chalk.green(`The directory: "${dirName}" was created successfully`));
  }
});
