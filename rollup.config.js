import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

import pkg from "./package.json";

export default {
  input: "src/index.js",
  external: [
    "react",
    "react-dom",
    "@react-spring/web",
    "@material-ui/core",
    "@material-ui/icons",
    "@material-ui/lab"
  ],
  output: [
    { name: "MuiTreeSelect", file: pkg.main, format: "cjs" },
    { name: "MuiTreeSelect", file: pkg.module, format: "es" },
    { name: "MuiTreeSelect", file: pkg.browser, format: "umd" }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions: [".jsx", ".js"] }),
    babel({
      extensions: [".jsx", ".js"],
      exclude: "node_modules/**"
    }),
    commonjs() // so Rollup can convert `ms` to an ES module
  ]
};
