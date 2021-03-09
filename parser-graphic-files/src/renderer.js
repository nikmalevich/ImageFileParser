const fs = require('fs');

function readFiles(event) {
  let filesHtml = '';
  const pixelSizesRegex = /\d+х\d+х\d+/;

    Array.from(event.target.files).forEach(file => {
      const filename = file.name;
    const fileSize = parseInt(fs.statSync(file.path).size);

      const pixelSizesStr = filename.match(pixelSizesRegex)[0];
      const pixelSizes = pixelSizesStr.split('х');

      const pixelSize = pixelSizes[0] + 'х' + pixelSizes[1];
      const permission = pixelSizes[2];
      const colorDepth = Math.round(8 * fileSize / parseInt(pixelSizes[0]) / parseInt(pixelSizes[1]));
      const compression = filename.replace(pixelSizesStr, '').split('.')[0];
        
      filesHtml += `<p>${filename}: size - ${pixelSize}; permission - ${permission}; depth - ${colorDepth}; compression - ${compression}</p>`;
    });

    document.getElementById('files').innerHTML = filesHtml;
}