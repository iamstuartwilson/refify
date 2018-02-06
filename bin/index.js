#!/usr/bin/env node

const refify = require('../');

const params = {
  path: process.argv[2] || '.',
  date: process.argv[3],
};

if (!params.path || !params.date) {
  throw(new Error(`Usage: refify ~/Path 2018-01-01`));
}

refify(params);
