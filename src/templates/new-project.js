module.exports = function (args) {
  const template = {
    name: args.name || "New project",
    description: args.description || "Imagine a beautiful description here :)",
    authType: args.auth_type || null,
    authKey: args.auth_key || null,
    requests: [],
  };

  const json = JSON.stringify(template, null, "  ");
  return json;
};
