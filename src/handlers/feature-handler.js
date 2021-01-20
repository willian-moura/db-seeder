const CreateProject = require("../features/create-project");
const CreateSeeder = require("../features/create-seeder");
const Seeder = require("../features/seeder");
const Login = require("../features/login");

const FeatureHandler = function (argv) {
  if (argv._.length > 1) {
    throw new Error("Please provide one single command at a time");
  }

  switch (argv._[0]) {
    case "create_project":
      return CreateProject(argv);
      break;
    case "create_seeder":
      return CreateSeeder(argv);
      break;
    case "seeder":
      return Seeder(argv);
      break;
    case "login":
      return Login(argv);
      break;
    default:
      throw new Error(`${argv._[0]} is not a valid command`);
      break;
  }
};

module.exports = FeatureHandler;
