const {
    override,
    babelInclude,
    removeModuleScopePlugin,
    setWebpackTarget,
} = require("customize-cra");
const path = require("path");

module.exports = override(
    // Remove the scope plugin so we can directly include the library from the parent folder
    removeModuleScopePlugin(),
    // Include our parent folder to babel so it will also transpile
    babelInclude([
        path.resolve("src"),
        path.resolve("../src"),
    ]),
    // Change the webpack target
    setWebpackTarget('electron-renderer'),
);