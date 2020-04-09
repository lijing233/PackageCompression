const fs = require("fs");
const path = require("path");
const crypto = require('crypto');
const chalk = require('chalk');


// function folderMap(dirPath) {
//   var filesList = fs.readdirSync(dirPath);

//   for (var i = 0; i < filesList.length; i++) {
//     var filePath = path.join(dirPath, filesList[i]);
//     var stats = fs.statSync(filePath);
//     if (stats.isDirectory()) {
//       folderMap(filePath)
//     } else {
//       console.log(filesList[i], "------", filePath);
//       fs.writeFileSync('./data.txt', filePath);
//     }
//   }
// }

var myRoot = '';

function copy(basePath, outputPath, baseUrl) {
  var folder = fs.readdirSync(basePath);

  folder.forEach(file => {
    var filePath = path.join(basePath, file);
    var stats = fs.statSync(filePath);

    if (stats.isFile()) {
      // md5
      const hash = crypto.createHash('md5');
      // 扩展名
      // const ext = path.extname(file);
      
      // 资源原始地址
      var dist = basePath + '/' + file;

      // 线上资源地址
      var onlinePath = dist.replace(myRoot + '/', baseUrl);
      
      const md5 = hash.update(onlinePath).digest("hex");
      // const newName = md5 + ext;
      console.log(chalk.yellow('md5 : '), chalk.greenBright(md5), chalk.yellow('  path: ') , chalk.greenBright(onlinePath));

      // 输出地址
      var distCopy = outputPath + '/' + md5;

      // 创建读取流
      readable = fs.createReadStream(dist);
      // 创建写入流
      writable = fs.createWriteStream(distCopy); 
      // 通过管道来传输流
      readable.pipe( writable );
    } else {

      var sonBase = basePath + '/' + file;

      copy(
        sonBase,
        outputPath,
        baseUrl
      )
    }
  })
}

module.exports = (root, baseUrl, copyRoot) => {
  myRoot = root;

  if (!fs.existsSync(copyRoot)) {
    fs.mkdirSync(copyRoot);
  }
  console.log('copy begin');
  copy(root, copyRoot, baseUrl);
  console.log('copy end');

};
