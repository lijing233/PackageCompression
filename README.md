# PackageCompression
Compress files into zip File;  Generate diff file 



## 安装

```
npm i -g packagecompression
```



**bsdiff-nodejs**   win环境需要安装环境

```
npm install –global –production windows-build-tools
```



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

