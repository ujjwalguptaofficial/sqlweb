const fs = require('fs-extra');
const path = require('path');
const workingDir = path.join(process.cwd(), "docs");
const srcDir = path.join(workingDir, 'build');
console.log("workingDir", workingDir, "srcDir", srcDir);
fs.copySync(srcDir, './');