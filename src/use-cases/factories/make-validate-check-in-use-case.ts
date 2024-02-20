import { PrismaCheckInsRepository } from "../../repoitories/prisma/prisma-check-ins-repoitory";
import { validateCheckInUseCase } from "../validate-check-in";

export function makeValidateCheckInUseCase() {
	const checkInsRepository = new PrismaCheckInsRepository();
	const useCase = new validateCheckInUseCase(checkInsRepository); 
	return useCase;
}