#!/usr/bin/env node
const fs = require('fs');
// const util = require('util');
const chalk = require('chalk');
const path = require('path');

// Method #2 of wrapping lstat in a promise
// const lstat = util.promisify(fs.lstat);

// Method #3 of wrapping lstat in a promise - the module already has a way of dealing with promises
// It can be deconstructed! -> const lstat = fs.promises.lstat;
const { lstat } = fs.promises;

const targetDirectory = process.argv[2] || process.cwd();

fs.readdir(targetDirectory, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const statsPromises = filenames.map((filename) => {
    return lstat(path.join(targetDirectory, filename));
  });

  const allStats = await Promise.all(statsPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(chalk.cyan(filenames[index]));
    } else {
      console.log(chalk.yellow(filenames[index]));
    }
  }
});

// Method #1 of wrapping lstat in a promise
/*  const lstat = (filename) => {
    return new Promise((resolve, reject) => {
      fs.lstat(filename, (err, stats) => {
        if (err) {
          reject(err);
        }

        resolve(stats);
      });
    });
  }; */
