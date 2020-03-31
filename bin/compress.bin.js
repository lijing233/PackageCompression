#!/usr/bin/env node

const fs = require("fs");
const compress = require("../build/compress.js");

let zipName = '';
let basePath = '';
let outputPath = '';
let zipVersion = '';

console.log('bigin');

if (process.env.npm_config_usePackageConfig) {
  // 使用package.json中compress配置
  zipName = process.env.npm_package_compress_zipName || 'dist';
  basePath = process.env.npm_package_compress_basePath || './dist';
  outputPath = process.env.npm_package_compress_outputPath || './package';
  zipVersion = process.env.npm_package_compress_zipVersion || process.env.npm_package_version;
  
} else {
  // 使用命令行中传入参数
  zipName = process.env.npm_config_zipName || 'dist';
  basePath = process.env.npm_config_basePath || './dist';
  outputPath = process.env.npm_config_outputPath || './package';
  zipVersion = process.env.npm_config_zipVersion || process.env.npm_package_version;
}

console.log('zipName :', zipName);
console.log('basePath :', basePath);
console.log('outputPath :', outputPath);
console.log('zipVersion :', zipVersion);

fs.exists(basePath, function (exists) {
  if (exists) {
    compress(basePath, outputPath, zipName, zipVersion)
  } else {
    console.log('需要压缩的文件或文件夹不存在！');
    process.exit();
  }
});