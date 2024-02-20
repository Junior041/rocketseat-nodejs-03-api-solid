import { PrismaGymsRepository } from "../../repoitories/prisma/prisma-gyms-repoitory";
import { SearchGymsUseCase } from "../search-gyms";

export function makeSearchGymsUseCase() {
	const gymsRepository = new PrismaGymsRepository();
	const useCase = new SearchGymsUseCase(gymsRepository);
	return useCase;
}