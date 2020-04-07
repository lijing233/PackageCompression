#!/usr/bin/env node
const { program } = require('commander');
const inquirer = require('inquirer');
const pkg = require('../package.json');
const fs = require("fs");
const path = require("path");
const utils = require('../common/utils');

const compress = require("../build/compress.js");
const diff = require("../build/diff.js");
const patch = require("../build/patch.js");
const map = require("../build/map.js");
const delDir = require("../build/deleteFiles.js")

  program
    .version(pkg.version)
    .usage('<command> [options]')
    .option('-v, --version', 'my version')

  program
    .command('compress')
    .description('creat a .zip compression file')
    .action(() => {
      const packageVersion = process.env.npm_package_version;
      inquirer.prompt([
        {
          name: 'basePath',
          type: 'input',
          default: './dist',
          message: 'Input the folder path which you want to compress'
        }, {
          name: 'zipName',
          type: 'input',
          default: 'dist',
          message: 'Input the .zip file name'
        }, {
          name: 'version',
          type: 'input',
          default: packageVersion,
          message: 'Input the version'
        }, {
          name: 'outputPath',
          type: 'input',
          default: './package',
          message: 'Input the output path'
        }
      ]).then((answer) => {
        console.log('compress-config', answer);
        if (!fs.existsSync(answer.basePath)) {
          utils.log.error('请输入正确的basePath!', true)
        } else {
          compress(
            answer.basePath,
            answer.outputPath,
            answer.zipName,
            answer.version)
        }
      })
    })
  
  program
    .command('diff')
    .description('generate the diff file from two package')
    .action(() => {
      const basePath = './package';
      const zips = fs.readdirSync(basePath).filter(file => {
        return path.extname(file) === ".zip";
      });
    
      zips.sort((a, b) => {
        //根据创建时间排序
        return (
          fs.statSync(basePath + "/" + b).birthtimeMs -
          fs.statSync(basePath + "/" + a).birthtimeMs
        );
      });

      console.log(zips);

      inquirer.prompt([
        {
          name: 'baseFile',
          type: 'list',
          default: zips[1],
          choices: zips,
          message: 'Choose the base file'
        },
        {
          name: 'newFile',
          type: 'list',
          default: zips[0],
          choices: zips,
          message: 'Choose the new file'
        }
      ]).then(answer => {
        console.log('diff-config', answer);
        const baseFilePath = basePath + '/' + answer.baseFile;
        const newFilePath = basePath + '/' + answer.newFile;
        const outputPath = basePath + '/diff_' + utils.getVersionStr(answer.baseFile) + '_' + utils.getVersionStr(answer.newFile) + '.bin';
        diff(baseFilePath, newFilePath, outputPath);
      })

    })

  program
    .command('patch')
    .description('use base file and diff file, to output the package')
    .action(() => {
      const basePath = './package';
      const zips = fs.readdirSync(basePath).filter(file => {
        return path.extname(file) === ".zip";
      });
      const diffFileList = fs.readdirSync(basePath).filter(file => {
        return path.extname(file) !== ".zip";
      });
      console.log('diffFileList :', diffFileList);
      inquirer.prompt([
        {
          name: 'baseFile',
          type: 'list',
          choices: zips,
          message: 'Choose the base file name'
        }, {
          name: 'diffFile',
          type: 'list',
          choices: diffFileList,
          message: 'Choose the diff file name'
        }, {
          name: 'outputName',
          type: 'input',
          message: 'Input the output file name'
        }
      ]).then(answer => {
        console.log('patch-config', answer);
        if (!answer.baseFile || !answer.diffFile || !answer.outputName) {
          utils.log.error('请输入完成参数!', true)
        }


        const baseFilePath = basePath + '/' + answer.baseFile;
        const diffFilePath = basePath + '/' + answer.diffFile;
        const outputPath = basePath + '/patch_' + answer.outputName + '.zip';

        if (!fs.existsSync(baseFilePath)) {
          utils.log.error('请输入正确的baseFile!', true)
        }

        if (!fs.existsSync(diffFilePath)) {
          utils.log.error('请输入正确的diffFile!', true)
        }
        patch(baseFilePath, outputPath, diffFilePath);
      })

    })

  program
    .command('build')
    .description('generate file map with url md5 string')
    .action(() => {
      inquirer.prompt([
        {
          name: 'basePath',
          type: 'input',
          default: './dist',
          message: 'Input the folder path which you want to compress'
        }, {
          name: 'baseUrl',
          type: 'input',
          default: 'http://active.wshareit.com/2020/covid/',
          message: 'Please enter the online path of the static resource'
        }, {
          name: 'zipName',
          type: 'input',
          default: 'dist',
          message: 'Input the zipName file name'
        }, {
          name: 'version',
          type: 'input',
          default: process.env.npm_package_version,
          message: 'Input the version'
        }
      ]).then(answer => {
        if (answer.basePath && answer.baseUrl && answer.zipName && answer.version) {
          // 生成复制文件夹
          map(
            answer.basePath,
            answer.baseUrl
          )

          const callback = () => {
            // 删除复制的文件夹
            delDir(answer.basePath + '_copy')
          }

          // 对复制文件夹进行压缩并放入package文件夹中
          compress(
            answer.basePath + '_copy',
            './package',
            answer.zipName,
            answer.version,
            callback
          )
          
          
        } else {
          utils.log.error('请输入完整的信息!', true)
        }
      })
    })


program.parse(process.argv);

if (program.args.length < 1) program.help()