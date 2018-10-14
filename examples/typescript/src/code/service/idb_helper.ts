import * as SqlWeb from 'sqlweb';
import * as JsStore from 'jsstore';
import * as workerPath from "file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js";

SqlWeb.use(JsStore);
// This will ensure that we are using only one instance. 
// Otherwise due to multiple instance multiple worker will be created.
export const con = new SqlWeb.Instance(workerPath);