const pathLib = require("path");
const fs = require("fs");

const saveFile = function (path, name, content) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error("Invalid path"));
    }

    if (!name) {
      reject(new Error("Invalid name"));
    }

    const fullPath = pathLib.join(path, name);

    fs.writeFile(fullPath, content, function (err) {
      if (err) reject(err);
      resolve(`${fullPath} file created successfully!`);
    });
  });
};

const mkDir = function (path, name) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error("Invalid path"));
    }

    if (!name) {
      reject(new Error("Invalid name"));
    }

    const fullPath = pathLib.join(path, name);

    if (fs.existsSync(fullPath)) {
      reject(new Error(`${fullPath} already exists`));
      return;
    }

    fs.mkdir(fullPath, { recursive: true }, function (err) {
      if (err) reject(err);
      resolve(`${fullPath} dir created successfully!`);
    });
  });
};

module.exports = {
  saveFile,
  mkDir,
};
