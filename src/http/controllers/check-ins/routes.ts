import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { metrics } from "./metrics";
import { validate } from "./validate";
import { history } from "./history";

export async function checkInsRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);
  
	app.get("/check-ins/history", history);
	app.get("/check-ins/metrics", metrics);
  
	app.post("/gyms/:gymId/check-ins", create);
	app.patch("/check-ins/:checkInId/validate", validate);
}