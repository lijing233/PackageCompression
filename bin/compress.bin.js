#!/usr/bin/env node

const fs = require("fs");
const compress = require("../build/compress.js");

let zipName = 'dist';
let zipBasePath = 'dist';
let zipOutputPath = 'dist';
let zipVersion = process.env.npm_package_version;

if (process.env.npm_config_usePackageConfig) {
  // 使用package.json中compress配置
  zipName = process.env.npm_package_compress_zipName || 'dist';
  zipBasePath = process.env.npm_package_compress_zipBasePath || './dist';
  zipOutputPath = process.env.npm_package_compress_zipOutputPath || './package';
  zipVersion = process.env.npm_package_compress_zipVersion || process.env.npm_package_version;
  
} else {
  // 使用命令行中传入参数
  zipName = process.env.npm_config_zipName || 'dist';
  zipBasePath = process.env.npm_config_zipBasePath || './dist';
  zipOutputPath = process.env.npm_config_zipOutputPath || './package';
  zipVersion = process.env.npm_config_zipVersion || process.env.npm_package_version;

}

console.log(zipVersion);

fs.exists(zipBasePath, function (exists) {
  if (exists) {
    compress(zipBasePath, zipOutputPath, zipName, zipVersion)
  } else {
    console.log('需要压缩的文件或文件夹不存在！');
    process.exit();
  }
});