import { Gym } from "@prisma/client";
import { GymsRepoitory } from "../repoitories/gym-repository";

interface SearchGymsUseCaseRequest {
  query: string;
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
	constructor(private gymsRepoitory: GymsRepoitory) {}

	async execute({ 
		query,page
	}: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
		const gyms = await this.gymsRepoitory.searchMany(query, page);
		return { gyms };
	}
}
