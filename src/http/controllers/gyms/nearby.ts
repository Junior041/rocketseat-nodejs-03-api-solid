import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchNearbyGymsUseCase } from "../../../use-cases/factories/make-fecth-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply){
    
	const nearbyGymsQuerySchema = z.object({
		latitude: z.coerce.number().refine(value => {
			return Math.abs(value) <= 90;
		}),
		longitude: z.coerce.number().refine(value => {
			return Math.abs(value) <= 100;
		}),
	});

	const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);
	const feachNearbyGymsUseCase = makeFetchNearbyGymsUseCase();
	const { gyms } = await feachNearbyGymsUseCase.execute({userLatitude: latitude, userLongitude: longitude});
	return reply.status(201).send({gyms});
}