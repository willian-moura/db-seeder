const yargs = require("yargs");

const ArgvHandler = function () {
  return yargs.command("create_project", "Create a new project file on path", {
    path: {
      description: "the path of project file",
      alias: "p",
      type: "string",
    },
    name: {
      description: "the name of project",
      alias: "n",
      type: "string",
    },
    description: {
      description: "the description of project",
      alias: "d",
      type: "string",
    },
    auth_type: {
      description: "the auth type used",
      alias: "a",
      type: "string",
    },
    auth_key: {
      description: "the auth key used",
      alias: "k",
      type: "string",
    },
  }).argv;
};

module.exports = ArgvHandler;
