// 主要用来同步文件
// 用法 node ~/dev-svn/wjq/node/syncFile.js ~/dev-svn/wjq/web/site/tmp/a/a.js ~/dev-svn/wjq/web/site/tmp/b/a.js 

const fs = require('fs');
const src = process.argv[2]; 
const target = process.argv[3]; 
const child_process = require('child_process');

function copy(src, target) {
	var fileWriteStream = fs.createWriteStream(target);
    fs.createReadStream(src).pipe(fileWriteStream);

    fileWriteStream.on("close", function() {
	    console.log("同步成功！");
	   	console.log("以下为两个文件的 md5 值对比");
    	checkMd5sum(src, target);
	});
}

function checkMd5sum(src, target) {
	child_process.exec("md5sum " + src,
	  function (error, stdout, stderr) {
		if (error !== null) {
		  console.log('exec error: ' + error);
		} else {
			console.log(stdout);
		}
	});

	child_process.exec("md5sum " + target,
	  function (error, stdout, stderr) {
		if (error !== null) {
		  console.log('exec error: ' + error);
		} else {
			console.log(stdout);
		}
	});
}

copy(src, target);
