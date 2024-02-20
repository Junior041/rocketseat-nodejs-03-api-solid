import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["dev", "test", "production"]),
	PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
	console.error("Variaveis de ambiente invalidas", _env.error.format());
	throw new Error("Variaveis de ambiente invalidas");
}
export const env = _env.data;