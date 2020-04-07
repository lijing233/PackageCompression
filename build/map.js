const fs = require("fs");
const path = require("path");
const crypto = require('crypto');


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

function copy(basePath, outputPath, baseUrl) {
  var folder = fs.readdirSync(basePath);
  folder.forEach(file => {
    var filePath = path.join(basePath, file);
    var stats = fs.statSync(filePath);

    if (stats.isFile()) {
      // md5
      const hash = crypto.createHash('md5');
      const md5 = hash.update(baseUrl + file).digest("hex");
      console.log('md5 :', md5, 'path: ' + baseUrl + file);

      var dist = basePath + '/' + file;
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

module.exports = (root, baseUrl) => {

  var copyRoot = root+ '_copy';

  if (!fs.existsSync(copyRoot)) {
    fs.mkdirSync(copyRoot);
  }
  console.log('copy begin');
  copy(root, copyRoot, baseUrl);
  console.log('copy end');

};
