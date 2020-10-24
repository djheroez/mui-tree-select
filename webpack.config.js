const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    library: "MuiTreeSelect",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    filename: "mui-tree-select.js"
  },
  optimization: {
    minimize: false
  },
  externals: [
    {
      react: {
        commonjs: ["react"],
        commonjs2: "react",
        amd: "react",
        umd: "react",
        root: "React"
      }
    },
    {
      "react-dom": {
        commonjs: ["react-dom"],
        commonjs2: "react-dom",
        amd: "react-dom",
        umd: "react-dom",
        root: "ReactDOM"
      }
    },
    "@react-spring/web",
    /@react-spring\/web\/*./,
    "@material-ui/core",
    "@material-ui/icons",
    "@material-ui/lab",
    /@material-ui\/core\/*./,
    /@material-ui\/icons\/*./,
    /@material-ui\/lab\/*./
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"]
  }
};
