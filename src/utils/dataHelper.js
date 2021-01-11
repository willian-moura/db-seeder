const { getJson } = require("../utils/fileHelper");

const processData = (data, projectDir) => {
  let treatedData = data;
  for (var prop in data) {
    if (Object.prototype.hasOwnProperty.call(data, prop)) {
      if (typeof data[prop] !== "string") {
        continue;
      }
      if (!data[prop].includes("@")) {
        continue;
      }
      const [key, field] = data[prop].split("@");
      if (key === "fk") {
        treatedData[prop] = getForeignKey(field, projectDir);
      }
    }
  }
  console.log(treatedData);
  return treatedData;
};

const getForeignKey = (field, projectDir) => {
  const [obj, value] = field.split("/");
  const [entity, prop] = obj.split(".");

  const entityPath = `${projectDir}/seeders/${entity}.json`;
  const seederConfig = getJson(entityPath);

  const allRequests = seederConfig.requests;
  const request = allRequests.find((element) => element[prop] == value);

  if (!request) {
    throw new Error(`Foreign key ${field} not found`);
  }

  return request._database_id;
};

module.exports = {
  processData,
};
