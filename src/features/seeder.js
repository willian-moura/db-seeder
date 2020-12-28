const fs = require("fs");
const pathLib = require("path");
const axios = require("../services/axios");
const { parseSeederPath, getJson } = require("../utils/fileHelper");

module.exports = async function (args) {
  if (!args.seeder_path) {
    throw new Error("--seeder_path option is required!");
  }

  const seederPath = parseSeederPath(args.seeder_path);
  const configPath = pathLib.join(seederPath.projectDir, "config.json");
  const projectConfig = getJson(configPath);
  const seederConfig = getJson(args.seeder_path);

  if (!seederConfig._active) {
    return console.log("SEEDER NOT ACTIVE IGNORED");
  }

  seederConfig.requests.forEach(async (request, index) => {
    if (request._active) {
      axios
        .request({
          url: seederConfig.url,
          method: seederConfig.method,
          data: request.data || null,
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
            // console.log(response.data);
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
  });
};
