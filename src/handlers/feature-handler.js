const CreateProject = require("../features/create-project");

const FeatureHandler = function (argv) {
  if (argv._.length > 1) {
    throw new Error("Please provide one single command at a time");
  }

  switch (argv._[0]) {
    case "create_project":
      return CreateProject(argv);
      break;
    default:
      throw new Error(`${argv._[0]} is not a valid command`);
      break;
  }
};

module.exports = FeatureHandler;
