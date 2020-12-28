const client = require("axios");

const request = (config) => {
  return client.request(config);
};

const get = async (endpoint, config) => {
  return await client.get(endpoint, config);
};

const post = async (endpoint, body, config) => {
  return await client.post(endpoint, body, config);
};

const put = async (endpoint, body, config) => {
  return await client.put(endpoint, body, config);
};

const patch = async (endpoint, body, config) => {
  return await client.patch(endpoint, body, config);
};

const del = async (endpoint, config) => {
  return await client.delete(endpoint, config);
};

module.exports = {
  request,
  get,
  post,
  put,
  patch,
  del,
};
