import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInsHistoryUseCase } from "../../../use-cases/factories/make-fecth-user-check-ins-history-use-case";

export async  function history(request: FastifyRequest, reply: FastifyReply){
    
	const checkInHistoryQuerySchema = z.object({
		q: z.string(),
		page: z.coerce.number().min(1).default(1)
	});

	const { page } = checkInHistoryQuerySchema.parse(request.query);
	const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();
	const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({ page, userId: request.user.sub });
	return reply.status(201).send({checkIns});
}