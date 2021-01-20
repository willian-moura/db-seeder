const { getJson } = require("../utils/fileHelper");

const processData = (data, projectDir) => {
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

  let treatedData = { ...data };
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
  return treatedData;
};

const getNestedProperty = (entity, prop) => {
  if (typeof prop === "string") {
    return entity[prop];
  }

  if (Array.isArray(prop)) {
    let aux = entity;
    prop.forEach((value, index) => {
      if (!aux[value]) {
        throw new Error(`Nested property ${value} not exists`);
      }
      aux = aux[value];
    });
    return aux;
  }

  throw new Error(`Entity property must be a string or a array`);
};

module.exports = {
  processData,
  getNestedProperty,
};
