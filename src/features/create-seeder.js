const fs = require("fs");
const pathLib = require("path");
const { getJson } = require("../utils/fileHelper");

const newSeederTemplate = require("../templates/new-seeder");
const { saveFile, incrementBasename, mkDir } = require("../utils/fileHelper");

module.exports = async function (args) {
  if (!args.project_path) {
    throw new Error("--project_path option is required!");
  }

  const projectPath = pathLib.join(args.project_path, "config.json");
  const projectConfig = getJson(projectPath);

  const newSeederFile = newSeederTemplate(args);

  await mkDir(args.project_path, "seeders", true);
  const seedersPath = pathLib.join(args.project_path, "seeders");

  let name = "new_seeder.json";

  if (args.name) {
    name = args.name + ".json";
  }

  try {
    const { filePath } = await saveFile(seedersPath, name, newSeederFile, true);
    projectConfig.seeders.push(filePath);

    console.log(projectConfig);

    const updatedProjectConfig = JSON.stringify(projectConfig, null, "  ");

    await saveFile(
      args.project_path,
      "config.json",
      updatedProjectConfig,
      false,
      true
    );
  } catch (err) {
    throw new Error(err);
  }
};
