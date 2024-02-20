import { defineConfig } from "vitest/config";
export default defineConfig({
	test: {
		environmentMatchGlobs: [
			["src/http/controllers/**", "./vitest-environments/prisma.ts"]
		]
	}
});