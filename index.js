#!/usr/bin/env node
const fs = require('fs');
const util = require('util');
// const chalk = require('chalk');
// const path = require('path');

// Method #2 of wrapping lstat in a promise
// const lstat = util.promisify(fs.lstat);

// Method #3 of wrapping lstat in a promise
// It can be deconstructed!
// const lstat = fs.promises.lstat;
const { lstat } = fs.promises;

// const targetDirectory = process.argv || process.cwd();

fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  for (let filename of filenames) {
      try {
        const stats = await  lstat(filename);

        console.log(filename, stats.isFile());
      } catch (err) {
        console.log(err);
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
