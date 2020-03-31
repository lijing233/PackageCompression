const bsdiff = require("bsdiff-nodejs");

// const fs = require("fs");
// const path = require("path");

// const oldFile = path.join(__dirname, '../package/dist1.zip');
// const newFile = path.join(__dirname, '../package/dist2.zip');
// const patchFile = path.join(__dirname, '../package/patch');
// const generatedFile = path.join(__dirname, '../package/generate.zip');

module.exports = async function asyncCall(oldFile, generatedFile, patchFile) {
    // await bsdiff.diff(oldFile, newFile, patchFile, function (result) {
    //     console.log('diff:' + String(result).padStart(4) + '%');
    // });

    await bsdiff.patch(oldFile, generatedFile, patchFile, function (result) {
        console.log('patch:' + String(result).padStart(4) + '%');
    });
}
