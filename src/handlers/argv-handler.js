const yargs = require("yargs");

const ArgvHandler = function () {
  return yargs
    .command("create_project", "Create a new project file on path", {
      path: {
        description: "the path of project folder",
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
      baseUrl: {
        description: "the base URL of project",
        alias: "b",
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
    })
    .command("create_seeder", "create new seeder on project path", {
      project_path: {
        description: "the path of project folder",
        alias: "p",
        type: "string",
      },
      name: {
        description: "the name of the seeder to be created",
        alias: "n",
        type: "string",
      },
      description: {
        description: "the description of the seeder",
        alias: "d",
        type: "string",
      },
      method: {
        description: "the request method type",
        alias: "t",
        type: "string",
      },
      url: {
        description: "the URL of the request",
        alias: "r",
        type: "string",
      },
    })
    .command("seeder", "execute the seeder passed on seeder_path option", {
      seeder_path: {
        description: "the path of seeder",
        alias: "p",
        type: "string",
      },
    })
    .command(
      "login",
      "Login the user automaticaly on the route, and set the auth key on project config file",
      {
        project_path: {
          description: "the path of project",
          alias: "p",
          type: "string",
        },
        user: {
          description: "user to login",
          alias: "u",
          type: "string",
        },
        pass: {
          description: "password to login",
          alias: "w",
          type: "string",
        },
      }
    )
    .command("project", "Execute all active seeds of project", {
      project_path: {
        description: "the path of project",
        alias: "p",
        type: "string",
      },
    }).argv;
};

module.exports = ArgvHandler;
