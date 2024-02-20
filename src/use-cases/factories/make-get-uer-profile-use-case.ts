import { PrismaUsersRepository } from "../../repoitories/prisma/prima-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase() {
	const usersRepository = new PrismaUsersRepository();
	const useCase = new GetUserProfileUseCase(usersRepository);
	return useCase;
}