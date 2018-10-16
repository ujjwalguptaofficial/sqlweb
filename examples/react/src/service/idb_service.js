import * as JsStore from "jsstore";
import * as SqlWeb from 'sqlweb';
JsStore.useSqlWeb(SqlWeb);
const Worker = require("worker-loader?publicPath=/&name=jsstore.worker.js!jsstore/dist/jsstore.worker.min");

// This will ensure that we are using only one instance. 
// Otherwise due to multiple instance multiple worker will be created.
export const idbCon = new JsStore.Instance(new Worker());