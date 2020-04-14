# PackageCompression
Compress files into zip File;  Generate diff file 



## 安装

```shell
npm i -g packagecompression
```



**bsdiff-nodejs**   win环境需要安装环境

```shell
npm install –global –production windows-build-tools
```



## diff-cli (选项引导命令)

### build

将所有资源放入文件夹，并将文件名替换为线上地址md5格式并压缩生成.zip

```
diff-cli build
```

根据提示以此输入

| 命令提示                   | 默认值                                 | 备注                      |
| -------------------------- | -------------------------------------- | ------------------------- |
| 1. 目标资源文件夹位置      | ./dist                                 | 请输入当前位置的相对路径  |
| 2. 线上资源路径            | http://active.wshareit.com/2020/covid/ | 格式与默认值一致，结尾带/ |
| 3. 活动code                | dist                                   | 活动id                    |
| 4. 版本号                  | package.json版本号                     | 版本号                    |
| 5.是否打包并删除复制文件夹 | y/n                                    |                           |

如果除了业务代码，需要添加其他插件，请在选项  `5、是否打包并删除复制文件夹`  选择   `n`  , 将所需资源手动添加到一起后再进行压缩



**使用配置文件**

```shell
diff-cli build --config
```

使用当前路径下compress.conf.js配置进行打包

```
module.exports = {
  basePath: './dist',
  baseUrl: 'http://active.wshareit.com/2020/covid/',
  zipName: 'ddddddd',
  version: '1.1.1',
  getZip: true
}
```

**生成配置文件**

```
diff-cli getConfig
```

使用此命令会在当前文件加下生成一份配置文件，然后使用  `diff-cli build --config`  进行打包



***！！请务必检查！！***

1.除插件底包外，项目中是否使用了其他CDN形式的插件

2.生成的压缩包内容中不可有一级、二级文件夹，必须是处理后的所有资源

3.生成的压缩包必须检查文件大小





### 其他功能

diff-cli使用了默认选项，可以更快的实现打包、差分、还原操作

#### compress

```
diff-cli compress
```

根据提示以此输入

| 命令提示              | 默认值             |
| --------------------- | ------------------ |
| 1. 压缩目标文件夹位置 | ./dist             |
| 2. 压缩生成的文件名   | dist               |
| 3. 版本号             | package.json版本号 |
| 4. 输出目录           | ./package          |



#### diff

默认目标文件夹 ./package

```
diff-cli diff
```

根据提示以此输入

| 命令提示        | 默认值             |
| --------------- | ------------------ |
| 1. 基础压缩包   | .zip时间排序第二个 |
| 2. 最新版压缩包 | .zip时间排序第一个 |



#### patch

默认目标文件夹 ./package

```
diff-cli patch
```

根据提示以此输入

| 命令提示      | 默认值               |
| ------------- | -------------------- |
| 1. 基础压缩包 | .zip时间倒排序第一个 |
| 2. diff文件   | 非diff文件第一个     |
| 3. 生成包名   | -                    |





## compress（压缩）

全局安装后使用compress命令

### 1.将配置放入package.json

```json
{
    "compress": {
        "zipBasePath": "./dist",
        "zipOutputPath": "./package",
        "zipName": "testlijing",
        "zipVersion": "1.0.0"
  	}
}
```

使用

```shell
compress --usePackageConfig
```

### 2.使用命令行传参

```shell
compress --zipBasePath=./dist --zipOutputPath=./package --zipName=test --zipVersion=1.1.1
```

### 3.参数

| 参数       | 说明                   | 类型   | 可选值 |        默认值         |
| ---------- | ---------------------- | ------ | :----: | :-------------------: |
| basePath   | 需要压缩的文件         | string |   -    |       './dist'        |
| outputPath | 存放压缩文件位置       | string |   -    |      './package'      |
| zipName    | 压缩包名称             | string |        |        'dist'         |
| zipVersion    | 版本（将放入文件名中） | string |        | package.json中version |



## diff (差分包)

### 1.将配置放入package.json

```json
{
    "diff": {
        "basePath": "./package",
        "oldFileName": "dist_v1.0.6.zip",
        "newFileName": "dist_v1.0.7.zip",
        "diffFileName": "myName"
  	}
}
```

使用

```shell
diff --usePackageConfig
```

### 2.使用命令行传参

```shell
diff --oldFileName=dist_v1.0.6.zip --newFileName=dist_v1.0.7.zip
```

### 3.参数

| 参数         | 说明           | 类型   | 可选值 |       默认值       |
| ------------ | -------------- | ------ | :----: | :----------------: |
| basePath     | 文件夹位置     | string |   -    |    './package'     |
| oldFileName  | 旧包文件名     | string |   -    | 创建时间排序第二个 |
| newFileName  | 新包文件名     | string |   -    | 创建时间排序第一个 |
| diffFileName | 打出diff文件名 | string |   -    |  diff_1.1.1_2.2.2  |





## patch (还原包)

### 1.将配置放入package.json

```json
{
    "patch": {
        "basePath": "./package",
        "baseFileName": "dist_v1.0.6.zip",
        "diffFileName": "diff_1.0.6_1.0.7",
        "patchFileName": "new_package.zip"
     }
}
```

使用

```shell
patch --usePackageConfig
```

### 2.使用命令行传参

```shell
patch --baseFileName=dist_v1.0.6.zip --diffFileName=diff_1.0.6_1.0.7
```

### 3.参数

| 参数          | 说明           | 类型   | 可选值 |   默认值    |
| ------------- | -------------- | ------ | :----: | :---------: |
| basePath      | 文件夹位置     | string |   -    | './package' |
| baseFileName  | 旧包文件名     | string |   -    |      -      |
| diffFileName  | diff文件名     | string |   -    |      -      |
| patchFileName | 还原生成的包名 | string |   -    | default.zip |

