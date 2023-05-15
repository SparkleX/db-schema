import { Table } from "../index.js";
import { DdlBuilder } from "./DdlBuilder.js";

export class Sqlite3DdlBuilder implements DdlBuilder{
	public mapFieldType(type: string, size: number): string {
		switch(type) {
			case "uuid":
				return "nvarchar(40)";
			case "string":
				return `nvarchar(${size})`;
			case "number":
				return "int";
			case "decimal":
				return "numberic(19,6)";
			case "text":
				return "text";
			case "time":
				return "text";
			case "date":
				return "text";
		}
		throw new Error(`${type} not defined`);
	}
    public createTable(table: Table): string {
		let sql = `create table ${table.name} (`;
		for (const fieldName of table.fieldsOrder) {
			let field = table.fields[fieldName];
			if (!field) {
				throw new Error(`${name}.${field} not defined`);
			}
			const type = this.mapFieldType(field.type, field.size);
			sql = sql + `${fieldName} ${type},`;
		}
		sql = sql.substring(0, sql.length - 1);
		sql = sql + ")";
		return sql;
    }
}

