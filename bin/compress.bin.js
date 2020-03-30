#!/usr/bin/env node

// console.log('ddddddd', process.argv);
// const argv_original = JSON.parse(process.env.npm_config_argv);
// console.log(argv_original);
// console.log(argv_original.remain);

const fs = require("fs");
const compress = require("../build/compress.js")

console.log(process.env.npm_package_myconfig_zipName);
console.log(process.env.npm_package_myconfig_zipBasePath);

const zipName = process.env.npm_package_myconfig_zipName || 'dist';
const zipBasePath = process.env.npm_package_myconfig_zipBasePath || './dist';
const zipOutputPath = process.env.npm_package_myconfig_zipOutputPath || './package';

fs.exists(zipBasePath, function(exists) {
  if (exists) {
    compress(zipBasePath, zipOutputPath, zipName)
  } else {
    console.log('需要压缩的文件或文件夹不存在！');
  }
});