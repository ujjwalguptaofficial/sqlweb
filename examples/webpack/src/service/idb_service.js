import * as JsStore from 'jsstore';
import * as SqlWeb from "sqlweb";
const workerPath = require("file-loader?name=scripts/jsstore.worker.js!../../node_modules/jsstore/dist/jsstore.worker");
JsStore.useSqlWeb(SqlWeb);

// This will ensure that we are using only one instance. 
// Otherwise due to multiple instance multiple worker will be created.
const worker = new Worker(workerPath);
export const con = new JsStore.Instance(worker);