import { PrismaCheckInsRepository } from "../../repoitories/prisma/prisma-check-ins-repoitory";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";

export function makeFetchUserCheckInsHistoryUseCase() {
	const checkInsRepository = new PrismaCheckInsRepository();
	const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
 
	return useCase;
}