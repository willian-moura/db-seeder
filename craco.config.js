const CracoLessPlugin = require("@craco/craco");
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@Features": path.join(path.resolve(__dirname, "./src/features")),
      "@Services": path.join(path.resolve(__dirname, "./src/services")),
      "@Utils": path.join(path.resolve(__dirname, "./src/utils")),
      "@axios": path.join(path.resolve(__dirname, "./src/services/axios")),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#3688fc",
              "@btn-danger-bg": "#f75959",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
