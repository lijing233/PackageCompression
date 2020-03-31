#!/usr/bin/env node

const fs = require("fs");
const patch = require("../build/patch");

let basePath = "";
let baseFileName = "";
let diffFileName ="";
let patchFileName = ""; // 还原后的文件名

if (process.env.npm_config_usePackageConfig) {

  basePath = process.env.npm_package_patch_basePath || './package';
  baseFileName = process.env.npm_package_patch_baseFileName;
  diffFileName = process.env.npm_package_patch_diffFileName;
  patchFileName = process.env.npm_package_patch_patchFileName || 'default.zip';
} else {
  basePath = process.env.npm_config_basePath || './package';
  baseFileName = process.env.npm_config_baseFileName;
  diffFileName = process.env.npm_config_diffFileName;
  patchFileName = process.env.npm_config_patchFileName || 'default.zip';
}

if (!baseFileName || !diffFileName) {
  console.log('请输入基础文件和diff文件名');
  process.exit();
}

if (!fs.existsSync(basePath)) {
  console.log('请配置目标文件夹');
  process.exit();
}

if (!fs.existsSync(basePath + '/' + baseFileName)) {
  console.log('请配置正确的 baseFileName');
  process.exit();
}

if (!fs.existsSync(basePath + '/' + diffFileName)) {
  console.log('请配置正确的 diffFileName');
  process.exit();
}

console.log('------ baseFilePath -------', basePath + '/' + baseFileName);
console.log('------ patchFilePath -------', basePath + '/' + patchFileName);
console.log('------ diffFilePath -------', basePath + '/' + diffFileName);

patch(
  basePath + '/' + baseFileName,
  basePath + '/' + patchFileName,
  basePath + '/' + diffFileName
)

