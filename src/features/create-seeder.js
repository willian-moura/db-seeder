const fs = require("fs");
const pathLib = require("path");

const newSeederTemplate = require("../templates/new-seeder");
const { saveFile, mkDir } = require("../utils/fileHelper");

module.exports = async function (args) {
  if (!args.project_path) {
    throw new Error("--project_path option is required!");
  }

  const newSeederFile = newSeederTemplate(args);

  await mkDir(args.project_path, "seeders", true);
  const seedersPath = pathLib.join(args.project_path, "seeders");

  if (args.name) {
    const name = args.name + ".json";
    return await saveFile(seedersPath, name, newSeederFile, true);
  }

  const name = "new_seeder.json";
  return await saveFile(seedersPath, name, newSeederFile, true);
};
