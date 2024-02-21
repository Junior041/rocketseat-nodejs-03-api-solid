import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCheckInUseCase } from "../../../use-cases/factories/make-check-in-use-case";

export async  function create(request: FastifyRequest, reply: FastifyReply){
	const createCheckInParamsSchema = z.object({
		gymId: z.string().uuid()
	});
	const createCheckInBodySchema = z.object({
		latitude: z.number().refine(value => {
			return Math.abs(value) <= 90;
		}),
		longitude: z.number().refine(value => {
			return Math.abs(value) <= 100;
		}),
	});
	const { gymId }  = createCheckInParamsSchema.parse(request.body);
	const { latitude, longitude } = createCheckInBodySchema.parse(request.body);
	const createCheckInUseCase = makeCheckInUseCase();
	await createCheckInUseCase.execute({gymId, userLatitude: latitude, userLongitude: longitude, userId: request.user.sub});
	return reply.status(201).send();
}