import "dotenv/config";
import { randomUUID } from "crypto";
import { Environment } from "vitest";
import { execSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string){
	if (!process.env.DATABASE_URL) {
		throw new Error("Please Provide a DATABASE_URL environment variable");
	}
	const url = new URL(process.env.DATABASE_URL);
	url.searchParams.set("schema", schema);
	return url.toString();
}

export default <Environment>{
	name: "prisma",
	transformMode: "ssr",
	async setup() {
		const schema  = randomUUID();
		const databaseUrl = generateDatabaseURL(schema);
		process.env.DATABASE_URL = databaseUrl;

		execSync("yarn prisma migrate deploy");

		return {
			async teardown() {
				await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
				await prisma.$disconnect;
			},
		};
	},
};
