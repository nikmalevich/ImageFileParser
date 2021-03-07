let fs = require('fs');

function readFiles() {
	let folder = document.getElementById('folder').value;

	fs.readdir(folder, (err, files) => {
		var filesHtml = '';
		let pixelSizesRegex = /\d+х\d+х\d+/;

  		files.forEach(file => {
  			let fileSize = parseInt(fs.statSync(folder + '/' + file).size);

  			let pixelSizesStr = file.match(pixelSizesRegex)[0];
  			let pixelSizes = pixelSizesStr.split('х');

  			let pixelSize = pixelSizes[0] + 'х' + pixelSizes[1];
  			let permission = pixelSizes[2];
  			let colorDepth = Math.round(8 * fileSize / parseInt(pixelSizes[0]) / parseInt(pixelSizes[1]));
  			let compression = file.replace(pixelSizesStr, '').split('.')[0];
    		
    		filesHtml += `<p>${file}: size - ${pixelSize}; permission - ${permission}; depth - ${colorDepth}; compression - ${compression}</p>`;
  		});

  		document.getElementById('files').innerHTML = filesHtml;
	});
}