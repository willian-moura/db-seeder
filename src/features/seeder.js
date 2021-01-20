const fs = require("fs");
const pathLib = require("path");
const axios = require("../services/axios");
const { parseSeederPath, getJson, saveFile } = require("../utils/fileHelper");
const { processData } = require("../utils/dataHelper");

module.exports = async (args) => {
  if (!args.seeder_path) {
    throw new Error("--seeder_path option is required!");
  }

  const seederPath = parseSeederPath(args.seeder_path);
  const configPath = pathLib.join(seederPath.projectDir, "config.json");
  const projectConfig = getJson(configPath);
  const seederConfig = getJson(args.seeder_path);

  if (!seederConfig._active) {
    return console.log("NOT ACTIVE SEEDER IGNORED");
  }

  for (const [index, request] of seederConfig.requests.entries()) {
    if (request._active) {
      console.log(`\nRUNNING SEEDER ${seederConfig.name}`);
      await axios
        .request({
          url: seederConfig.url,
          method: seederConfig.method,
          data: request.data
            ? processData(request.data, seederPath.projectDir)
            : null,
          headers: projectConfig.authType
            ? {
                Authorization: `${projectConfig.authType} ${projectConfig.authKey}`,
              }
            : null,
        })
        .then(
          (response) => {
            console.log(`\nREQUEST ${request._identifier || index}`);
            console.log(`RESPONSE[${response.status}]: ${response.statusText}`);
            console.log(response.data);
            request._database_id = response.data.id;
          },
          (error) => {
            console.log(`\nREQUEST ${request._identifier || index}`);
            console.log(
              `ERROR[${error.response.status}]:`,
              error.response.statusText
            );
          }
        );
    } else {
      console.log(`\nREQUEST ${request._identifier || index}`);
      console.log(`\tNOT ACTIVE REQUEST IGNORED`);
    }
  }

  const updatedSeederConfig = JSON.stringify(seederConfig, null, "  ");
  return await saveFile(
    seederPath.dir,
    seederPath.base,
    updatedSeederConfig,
    false,
    true
  );
};
