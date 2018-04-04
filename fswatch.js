var fs = require('fs');
const crypto = require('crypto');
var fileDirectory = __dirname
var arryfilename = {}
// readHtml(fileDirectory)
// test over
// function changeName(url) {
// 	fs.readFile(url, (err, data) => {
// 		if (err) throw err;
// 		var strdata = data.toString()
// 		for (attr in arryfilename) {
// 			console.log(attr + '.' + arryfilename[attr][1])
// 			var re = new RegExp(attr + '.' + arryfilename[attr][1], 'gi')
// 			strdata = strdata.replace(re, arryfilename[attr][0] + '.' + arryfilename[attr][1]);
// 		}
// 		fs.writeFile(url, strdata, function(error) {
// 			console.log(error);
// 		})
// 	});
// }

{
	'234ac3268b3ecd0eaf7033d3ee35e835': ['234ac3268b3ecd0eaf7033d3ee35e835', 'png'],
	brand: ['1149f301dfc404cb6dcc9c4e71f28294', 'png'],
	code: ['16e6183c0ebb136ee217fb7c27e0bac9', 'jpg'],
	code_80: ['a735146deb25cd68c8352af7efa56dc9', 'jpg'],
	code_84: ['2ecbde1ac4b02af5fc5795c03ae2cb6d', 'jpg'],
	code_88: ['412c0c249fd9152548345bd32753b9e1', 'jpg'],
	'图层1': ['f26590181c9192e8533854f49e96aa89', 'jpg'],
	code_90: ['25405e2dac37b91c4083262acf6c3c06', 'jpg'],
	'图层35': ['a435d7470afff010fb0bb9e9bd9ec40e', 'jpg'],
	'图层36': ['98d8b2891f0c89acc262ac1fe001aebf', 'jpg'],
	'矩形10': ['af6b39588f41ebffee12231a87895752', 'png']
}


fs.readdir(fileDirectory + '/img', function(err, files) {
	if (err) {
		console.log(err);
		return;
	}
	files.forEach(function(filename) {
		console.log(filename);
		myhash(fileDirectory, filename)
	})

})
//hash改名字完毕

// readHtml(fileDirectory, 'html', 'abc')
// readHtml(fileDirectory, 'qq.png', 'qq男1111.png')
// fs.watch(fileDirectory, function(eventType, filename) {
// 	if (eventType == 'rename') {
// 		console.log(eventType)
// 		console.log(filename)

// 		fileisnull(fileDirectory, filename)
// 		// var data = filename;
// 		// var key = 'Password!';
// 		// var encrypted = aesEncrypt(data, key);
// 		// var decrypted = aesDecrypt(encrypted, key);

// 		// console.log('Plain text: ' + data);
// 		// console.log('Encrypted text: ' + encrypted);
// 		// console.log('Decrypted text: ' + decrypted);
// 	}
// })

// function aesEncrypt(data, key) {
// 	const cipher = crypto.createCipher('aes192', key);
// 	var crypted = cipher.update(data, 'utf8', 'hex');
// 	crypted += cipher.final('hex');
// 	return crypted;
// }

// function aesDecrypt(encrypted, key) {
// 	const decipher = crypto.createDecipher('aes192', key);
// 	var decrypted = decipher.update(encrypted, 'hex', 'utf8');
// 	decrypted += decipher.final('utf8');
// 	return decrypted;
// }

function fileisnull(fileDirectory, filename) {
	fs.open(fileDirectory + '/' + filename, 'r', function(error, fd) {
		if (error) {
			console.log('file is delete');
		} else {
			myhash(fileDirectory, filename)
		}
	})
}

function myhash(fileDirectory, filename) {
	var rs = fs.createReadStream(fileDirectory + '/img/' + filename)
	var hash = crypto.createHash('md5');
	rs.on('data', hash.update.bind(hash));

	rs.on('end', function() {
		var newname = hash.digest('hex');
		var exte = filename.split('.')
		// rename(fileDirectory, filename, newname + '.' + exte[exte.length - 1])
		arryfilename[exte[0]] = [newname, exte[exte.length - 1]]
		console.log(arryfilename);
	});
}

function rename(fileDirectory, filename, newname) {
	if (filename == newname) {
		return;
	}
	fs.rename(fileDirectory + '/img/' + filename, fileDirectory + '/img/' + newname, function(error) {
		if (error) {
			console.log('file repeat')
			delete(fileDirectory + '/' + filename);
			return;
		}
	})
}


function fileDelete(url) {

	fs.unlink(url, (error) => {
		if (error) {
			console.log(error)
			return;
		}
		console.log('file delete.')
	})
}


function readFile(url, name, picname, picnewname) {
	// fs.readFile(url, (err, data) => {
	// 	if (err) {
	// 		console.log(err)
	// 		return;
	// 	}
	// console.log(url)
	// console.log(name)
	var data = fs.createReadStream(url)
	data.setEncoding('utf-8')
	data.on('data', (chunk) => {
		console.log(`Received ${chunk.length} bytes of data.`);
		var strdata = chunk
		var re = new RegExp(picname, 'gi')
		strdata = strdata.replace(re, picnewname);
		var writestr = fs.createWriteStream(url)
		writestr.write(strdata);

	});
	data.on('end', (chunk) => {
		console.log('end');
	});
	// var strdata = data.read();
	// // console.log(strdata);
	// console.log(picname + ' ' + picnewname)
	// writestr.write(strdata, 'utf-8', function() {
	// 	console.log('write over');
	// })

	// fs.writeFile(url, strdata, function(error) {
	// 	if (error) {
	// 		console.log(error)
	// 		return
	// 	}
	// })
	// });
}


function readHtml(fileDirectory) {
	fs.readdir(fileDirectory, function(err, files) {
		if (err) {
			console.log(err);
			return;
		}
		files.forEach(function(filename) {
			if (filename.match(/(\.html|input|css|js)$/)) {
				// console.log(filename)
				var arry = filename.split('.')
				if (arry.length == 1) {
					// console.log('next')
					// console.log(arry[0]);
					readDir(fileDirectory + '/' + arry[0])
				} else {
					// console.log(arry[1])
					if (arry[1] == 'html') {
						changeName(fileDirectory + '/' + filename);
					}
				}
				// console.log(arry.length);
				// readFile(fileDirectory + '/' + filename);
			}
			// if (filename.match(/css$/) == 'css') {
			// 	console.log(filename);
			// 	// readFile(fileDirectory + '/' + filename);
			// }
			// if (filename.match(/input$/) == 'input') {
			// 	console.log(filename);
			// 	// readFile(fileDirectory + '/' + filename);
			// }
		})

	})
}



function readDir(url) {
	fs.readdir(url, function(err, files) {
		if (err) {
			console.log(err);
			return;
		}
		files.forEach(function(filename) {
			// console.log(url);
			changeName(url + '/' + filename);
		})

	})
}
