#!/usr/bin/env node

var currentNodeVersion = process.versions.node;
var [major, minor] = currentNodeVersion.split(".");

if (major < 8 || minor < 6) {
  console.error(
    "You are running Node " +
      currentNodeVersion +
      ".\n" +
      "prettier-please requires Node 8.6.0 or higher. \n" +
      "Please update your version of Node."
  );
  process.exit(1);
}

require("./prettierPlease");
