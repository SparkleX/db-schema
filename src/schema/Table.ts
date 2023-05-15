/* eslint-disable prettier/prettier */
/* tslint:disable */
/* Generated, DO NOT MODIFY BY HAND */

export type EditType = "amount" | "price";

export interface Table {
	name?: string;
	fields?: {
		[k: string]: Field;
	};
	fieldsOrder?: string[];
	key?: string[];
	transient?: boolean;
	tables?: string[];
	extends?: string;
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[A-Z][A-Za-z0-9]{1,9}$".
 */
export interface Field {
	type?: "uuid" | "string" | "text" | "number" | "decimal" | "date" | "time";
	size?: number;
	defaultValue?: string;
	codeList?: string;
	transient?: boolean;
	editType?: EditType;
	invisible?: boolean;
	linkTo?: string;
	/**
	 * @minItems 2
	 * @maxItems 2
	 */
	boolValue?: [string, string];
	note?: string;
}
