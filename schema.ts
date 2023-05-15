import fs from "fs";
import path from "path";
import { compile } from "json-schema-to-typescript";
import jsonfile from "jsonfile";
import camelCase from "camelcase";
import glob from "glob";

console.log("generate schema");
const outputSchemaFolder = "src";

async function generateSchema() {
	const files = glob.sync(`schema/**/index.json`);
	for (const filename of files) {
		console.debug(filename);
		const pasedPath = path.parse(filename);
		try {
			await generateSchemaFile(filename);
		} catch (error) {
			console.error(filename);
			console.error(error);
			throw error;
		}
	}
}

async function generateSchemaFile(shcmeaFile) {
	const schemaDirname = path.dirname(shcmeaFile);
	const schema = jsonfile.readFileSync(shcmeaFile);
	const extension = path.extname(shcmeaFile);
	const basename = path.basename(shcmeaFile, extension);
	let tsFilename = basename;
	if (schema.title !== undefined) {
		tsFilename = schema.title;
	}
	tsFilename = camelCase(tsFilename, { pascalCase: true });
	const script = await compile(schema, tsFilename, {
		cwd: schemaDirname,
		bannerComment:
			"/* eslint-disable prettier/prettier */\n/* tslint:disable */\n/* Generated, DO NOT MODIFY BY HAND */\n",
		style: {
			useTabs: true
		}
	});
	fs.mkdirSync(outputSchemaFolder, { recursive: true });
	fs.writeFileSync(`${outputSchemaFolder}/${tsFilename}.ts`, script);
}
await generateSchema();