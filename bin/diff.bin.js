#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const diff = require("../build/diff");

const packageFolder = process.env.npm_config_basePath || './package';


let oldFileName = "";
let newFileName = "";
let diffFileName = "";
let basePath = "";

if (process.env.npm_config_usePackageConfig) {
  oldFileName = process.env.npm_package_diff_oldFileName;
  newFileName = process.env.npm_package_diff_newFileName;
  diffFileName = process.env.npm_package_diff_diffFileName;
  basePath = process.env.npm_package_diff_basePath || './package';
} else {
  oldFileName = process.env.npm_config_oldFileName;
  newFileName = process.env.npm_config_newFileName;
  diffFileName = process.env.npm_config_diffFileName;
  basePath = process.env.npm_config_basePath || './package';
}

if (!fs.existsSync(basePath)) {
  console.log('请配置目标文件夹');
  process.exit();
}

// const oldFileName = process.env.npm_config_oldFileName;
// const newFileName = process.env.npm_config_newFileName;
// const diffFileName = process.env.npm_config_diffFileName;

if (oldFileName && newFileName) {
  console.log('------ user input config ------');
  
  const oldFilePath = packageFolder + '/' + oldFileName;
  const newFilePath = packageFolder + '/' + newFileName;
  const diffFilePath = diffFileName ? packageFolder + '/' + diffFileName : packageFolder + '/diff_' + getVersionStr(oldFileName) + '_' + getVersionStr(newFileName);

  console.log('---------  oldFilePath  --------', oldFilePath);
  console.log('---------  newFilePath  --------', newFilePath);
  console.log('---------  diffFilePath  --------', diffFilePath);

  diff(oldFilePath, newFilePath, diffFilePath);
} else {
  console.log('------ default config ------');
  const zips = fs.readdirSync(packageFolder).filter(file => {
    return path.extname(file) === ".zip";
  });
  zips.sort((a, b) => {
    //根据创建时间排序
    return (
      -fs.statSync(packageFolder + "/" + a).birthtimeMs -
      fs.statSync(packageFolder + "/" + b).birthtimeMs
    );
  });

  console.log('------- oldFilePath --------', packageFolder + "/" + zips[1]);
  console.log('------- newFilePath --------', packageFolder + "/" + zips[0]);
  console.log('------- diffFilePath --------', packageFolder + "/" + "diff_" + fileVersion(zips[1]) + "_" + fileVersion(zips[0]));

  diff(
    packageFolder + "/" + zips[1],
    packageFolder + "/" + zips[0],
    packageFolder +
      "/" +
      "diff_" +
      fileVersion(zips[1]) +
      "_" +
      fileVersion(zips[0])
  );
}


function fileVersion(filename) {
  // dist_v1.2.0.zip
  return path
    .basename(filename, ".zip")
    .split("_v")
    .pop(); // 1.2.0
}

function getVersionStr(str) {
  let res = str.match(/_v(\S*).zip/)[1];
 return res || str;
}
