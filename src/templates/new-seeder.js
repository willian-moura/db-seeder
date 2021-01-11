const pathLib = require("path");
const { getJson } = require("../utils/fileHelper");

module.exports = function (args) {
  const path = pathLib.join(args.project_path, "config.json");
  const config = getJson(path);

  let fullUrl = config.baseUrl;

  if (args.url) {
    fullUrl = `${fullUrl}${args.url}`;
  }

  const template = {
    _help: `Use the bodies array to put the body of your seeder. Each body inserted will be a request on that route`,
    _active: true,
    name: args.name || "New seeder",
    description: args.description || "Imagine a beautiful description here :)",
    method: args.method || "POST",
    url: fullUrl,
    requests: [
      {
        _active: true,
        _id: null,
        _database_id: null,
        data: {
          some_atrubute: "some_value",
          some_atrubute2: "some_value2",
        },
      },
    ],
  };

  const json = JSON.stringify(template, null, "  ");
  return json;
};
