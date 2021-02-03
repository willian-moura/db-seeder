const Seeder = require("./seeder");
const pathLib = require("path");
const { getJson } = require("../utils/fileHelper");

module.exports = async (args) => {
  if (!args.project_path) {
    args.project_path = ".";
  }

  const configPath = pathLib.join(args.project_path, "config.json");
  const projectConfig = getJson(configPath);

  if (!projectConfig.seeders || projectConfig.seeders.length === 0) {
    throw new Error("Project seeders empty!");
  }

  try {
    for (const [index, seederPath] of projectConfig.seeders.entries()) {
      await Seeder({ seeder_path: seederPath });
    }
  } catch (error) {
    throw new Error(error);
  }
};
