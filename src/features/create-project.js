const fs = require("fs");
const pathLib = require("path");

const newProjectTemplate = require("../templates/new-project.js");
const { saveFile, mkDir } = require("../utils/fileHelper");

module.exports = async function (args) {
  if (!args.path) {
    throw new Error("--path option is required!");
  }

  const newProjectFile = newProjectTemplate(args);

  if (args.name) {
    await mkDir(args.path, args.name);

    let path = pathLib.join(args.path, args.name);
    return await saveFile(path, "config.json", newProjectFile);
  }

  const name = "new_project";
  await mkDir(args.path, name);

  let path = pathLib.join(args.path, name);
  return await saveFile(path, "config.json", newProjectFile);
};
