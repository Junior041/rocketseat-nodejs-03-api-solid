import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileUseCase } from "../../../use-cases/factories/make-get-uer-profile-use-case";

export async  function profile(request: FastifyRequest, reply: FastifyReply){
	const getUserProfile = makeGetUserProfileUseCase();

	const {user} = await getUserProfile.execute({
		userId: request.user.sub
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password_hash, ...userWithoutPassword } = user;


	return reply.status(200).send({
		user: userWithoutPassword
	});
}