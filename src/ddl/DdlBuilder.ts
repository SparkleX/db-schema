import { Table } from "../schema/Table.js";

export interface DdlBuilder {
    createTable(table:Table): string;
}