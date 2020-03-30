const fs = require("fs");
const diff = require("../build/diff");



const packageFolder = process.env.npm_package_compress_zipVersion || './package';
if (!fs.existsSync(packageFolder)) {
  console.log('请配置目标文件夹');
  process.exit();
}

const oldFileName = process.env.npm_config_oldFileName;
const newFileName = process.env.npm_config_newFileName;
const diffFileName = process.env.npm_config_diffFileName;

if (oldFileName && newFileName) {
  const oldFilePath = packageFolder + '/' + oldFileName;
  const newFilePath = packageFolder + '/' + newFileName;
  const diffFilePath = diffFileName ? packageFolder + '/' + diffFileName : packageFolder + '/diff_' + oldFileName + '_' + newFileName;
  diff(oldFilePath, newFilePath, diffFilePath);
} else {
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
