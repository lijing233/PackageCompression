#!/usr/bin/env nod
const { program } = require('commander');
const inquirer = require('inquirer');
const pkg = require('../package.json');
const fs = require("fs");
const path = require("path");
const utils = require('../common/utils');

const compress = require("../build/compress.js");
const diff = require("../build/diff");

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
        const outputPath = basePath + '/diff_' + utils.getVersionStr(answer.baseFile) + '_' + utils.getVersionStr(answer.newFile);
        diff(baseFilePath, newFilePath, outputPath);
      })

    })


program.parse(process.argv);

if (program.args.length < 1) program.help()