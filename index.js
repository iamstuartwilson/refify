const findit = require('findit');
const path = require('path');
const { exec } = require('child_process');

const refify = params => {
  const finder = findit(params.path);
  const data = [];

  finder.on('directory', function (dir, stat, stop) {
    if (path.basename(dir) === '.git') {
      exec(
        `cd ${dir} && git reflog --date=iso | grep ${params.date} | grep commit`,
        (err, output) => {
          if (output) {
            data.push([dir.replace('/.git', ''), output].join("\n"));
          }
        });
    }
  });

  finder.on('end', () => console.log(data.join('')));
}

module.exports = refify;
