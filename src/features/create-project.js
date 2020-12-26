const fs = require("fs");
const pathLib = require("path");

const newProjectTemplate = require("../templates/new-project.js");
const { saveFile, mkDir } = require("../utils/fileHelper");

module.exports = function (args) {
  const newProjectFile = newProjectTemplate(args);

  if (args.name) {
    mkDir(args.path, args.name).then(function () {
      let path = pathLib.join(args.path, args.name);
      saveFile(path, "config.json", newProjectFile);
    });
    return;
  }

  const name = "new_project";
  mkDir(args.path, name).then(function () {
    let path = pathLib.join(args.path, name);
    saveFile(path, "config.json", newProjectFile);
  });
};
