module.exports = function (args) {
  const template = {
    name: args.name || "New project",
    description: args.description || "Imagine a beautiful description here :)",
    baseUrl: args.baseUrl || "http://localhost:8080",
    authType: args.auth_type || null,
    authKey: args.auth_key || null,
    login: {
      url: "",
      responseAccessKey: "token",
      responseTokenTypeKey: "token_type",
      userFieldName: "user",
      userFieldData: "admin",
      passwordFieldName: "password",
      passwordFieldData: "admin",
      data: {

      }
    },
    seeders: [],
  };

  const json = JSON.stringify(template, null, "  ");
  return json;
};
