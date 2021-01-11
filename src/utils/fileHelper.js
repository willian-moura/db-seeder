const pathLib = require("path");
const fs = require("fs");

const getBasename = function (fullpath, removeExtension = false) {
  if (removeExtension) {
    return pathLib.parse(fullpath).name;
  }
  return pathLib.parse(fullpath).base;
};

const isNumber = function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
};

const incrementBasename = function (path) {
  const basename = getBasename(path, true);
  const extension = pathLib.extname(path);

  const lastChar = basename.slice(-1);

  if (isNumber(lastChar)) {
    let i = parseInt(lastChar);
    const newBasename = `${basename.slice(0, -1)}${i + 1}${extension}`;
    return newBasename;
  }

  const newBasename = `${basename}1${extension}`;
  return newBasename;
};

const saveFile = function (
  path,
  name,
  content,
  incrementIfExists = false,
  overwrite = false
) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error("Invalid path"));
    }

    if (!name) {
      reject(new Error("Invalid name"));
    }

    let fullPath = pathLib.join(path, name);

    if (fs.existsSync(fullPath) && !overwrite) {
      if (!incrementIfExists) {
        return reject(new Error(`${fullPath} already exists`));
      }
      const newName = incrementBasename(fullPath);
      return saveFile(path, newName, content, true);
    }

    fs.writeFile(fullPath, content, function (err) {
      if (err) reject(err);
      resolve(`${fullPath} file created successfully!`);
    });
  });
};

const mkDir = function (path, name, createIfNotExists = false) {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error("--path is required"));
    }

    if (!name) {
      reject(new Error("Invalid name"));
    }

    const fullPath = pathLib.join(path, name);

    if (fs.existsSync(fullPath)) {
      if (createIfNotExists) {
        return resolve();
      }
      return reject(new Error(`${fullPath} already exists`));
    }

    fs.mkdir(fullPath, { recursive: true }, function (err) {
      if (err) reject(err);
      resolve(`${fullPath} dir created successfully!`);
    });
  });
};

const getJson = function (path) {
  const json = fs.readFileSync(path);
  return JSON.parse(json);
};

const parseSeederPath = function (fullPath) {
  return {
    name: pathLib.parse(fullPath).name,
    base: pathLib.parse(fullPath).base,
    ext: pathLib.parse(fullPath).ext,
    dir: pathLib.parse(fullPath).dir,
    projectDir: pathLib.dirname(pathLib.dirname(fullPath)),
  };
};

module.exports = {
  saveFile,
  mkDir,
  getJson,
  parseSeederPath,
};
