const fs = require("fs");
const pathLib = require("path");
const axios = require("../services/axios");
const { getJson, saveFile } = require("../utils/fileHelper");
const { processData, getNestedProperty } = require("../utils/dataHelper");

module.exports = async (args) => {
  if (!args.project_path) {
    throw new Error("--project_path option is required!");
  }

  const configPath = pathLib.join(args.project_path, "config.json");
  const projectConfig = getJson(configPath);
  const loginConfig = projectConfig.login;

  console.log(loginConfig);

  let fullUrl = projectConfig.baseUrl;
  if (loginConfig.url) {
    fullUrl = `${fullUrl}${loginConfig.url}`;
  }

  if (loginConfig) {
    const user = args.user;
    const password = args.pass;

    const loginData = {};
    loginData[loginConfig.userFieldName] = user || loginConfig.userFieldData;
    loginData[loginConfig.passwordFieldName] =
      password || loginConfig.passwordFieldData;

    await axios
      .request({
        url: fullUrl,
        method: "POST",
        data: loginData,
      })
      .then(
        (response) => {
          console.log(`\nLOGIN SUCCESSFUL`);
          console.log(`RESPONSE[${response.status}]: ${response.statusText}`);
          console.log(response.data);
          projectConfig.authKey = getNestedProperty(
            response.data,
            loginConfig.responseAccessKey
          );
        },
        (error) => {
          console.log(`\nLOGIN FAILED`);
          console.log(
            `ERROR[${error.response.status}]:`,
            error.response.statusText
          );
        }
      );
  }

  const updatedProjectConfig = JSON.stringify(projectConfig, null, "  ");

  return await saveFile(
    args.project_path,
    "config.json",
    updatedProjectConfig,
    false,
    true
  );
};
