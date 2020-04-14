const fs = require('fs');
const defaultConf = require("../common/default.conf.js");
const utils = require("../common/utils");

// 生成config配置文件
function generateConfigFile(){
  const outputPath = './compress.conf.js'
  fs.writeFile(
    outputPath, 
    defaultConf.getTemplate(),
    err => {
      if (err) throw err;
      utils.log.info('compress.conf.js配置文件已生成！请修改配置后使用 diff-cli build --config 打包资源');
    }
  )
}

module.exports = generateConfigFile;