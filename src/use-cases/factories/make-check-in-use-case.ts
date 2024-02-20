import { PrismaCheckInsRepository } from "../../repoitories/prisma/prisma-check-ins-repoitory";
import { PrismaGymsRepository } from "../../repoitories/prisma/prisma-gyms-repoitory";
import { CheckInUseCase } from "../check-in";

export function makeCheckInUseCase() {
	const checkInsRepository = new PrismaCheckInsRepository();
	const gymsRepository = new PrismaGymsRepository();
	const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);
	return useCase;
}