import * as SqlWeb from 'sqlweb';
import * as JsStore from 'jsstore';
import * as workerPath from "file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js";

JsStore.useSqlWeb(SqlWeb);

// This will ensure that we are using only one instance. 
// Otherwise due to multiple instance multiple worker will be created.
export const con = new JsStore.Instance(new Worker(workerPath));