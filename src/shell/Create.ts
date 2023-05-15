
import { Sqlite3DdlBuilder } from "../ddl/Sqlite3DdlBuilder.js";
import jsonfile from "jsonfile";
import { default as glob } from "glob";

const builder = new  Sqlite3DdlBuilder();

const files = glob.sync(`./*.table.json`);
for (const file of files) {
	const oTable = jsonfile.readFileSync(file);
	const sql = builder.createTable(oTable) + ";";
	console.debug(sql);
}