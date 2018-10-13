import * as SqlWeb from "sqlweb";
const workerPath = require("file-loader?name=scripts/jsstore.worker.js!../../node_modules/jsstore/dist/jsstore.worker");

// This will ensure that we are using only one instance. 
// Otherwise due to multiple instance multiple worker will be created.

export const idbCon = new SqlWeb.Instance(workerPath);