import { Sqlite3DdlBuilder } from "../Sqlite3DdlBuilder";
import jsonfile from "jsonfile";
const builder = new  Sqlite3DdlBuilder();

test("create", async () => {
	const oTable = jsonfile.readFileSync("./test/OCRD.table.json");
	const sql = builder.createTable(oTable);
	console.debug(sql);
	expect(sql).toStrictEqual('create table OCRD (Id nvarchar(40),Name nvarchar(64))');
});