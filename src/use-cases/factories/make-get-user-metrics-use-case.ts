import { PrismaCheckInsRepository } from "../../repoitories/prisma/prisma-check-ins-repoitory";
import { GetUserMetricsUseCase } from "../get-user-matrics";

export function makeGetUserMetricsUseCase() {
	const checkInsRepository = new PrismaCheckInsRepository();
	const useCase = new GetUserMetricsUseCase(checkInsRepository);
	return useCase;
}