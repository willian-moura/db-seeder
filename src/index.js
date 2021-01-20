#!/usr/bin/env node
const yargs = require("yargs");
const ArgvHandler = require("./handlers/argv-handler");
const FeaturesHandler = require("./handlers/feature-handler");

const argv = ArgvHandler();
FeaturesHandler(argv);
