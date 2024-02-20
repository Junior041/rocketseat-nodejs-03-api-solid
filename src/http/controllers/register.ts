import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "../../use-cases/register";
import { PrismaUsersRepository } from "../../repoitories/prisma/prima-users-repository";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error";

export async  function register(request: FastifyRequest, reply: FastifyReply){
    
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, name, password } = registerBodySchema.parse(request.body);
	try {
		const prismaUsersRepository = new PrismaUsersRepository();
		const registerUseCase = new RegisterUseCase(prismaUsersRepository);
		await registerUseCase.execute({email, name, password});
		
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			reply.status(409).send({message: error.message});
		}
		throw error;
	}
	return reply.status(200).send();
}