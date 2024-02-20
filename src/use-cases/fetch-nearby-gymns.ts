import { Gym } from "@prisma/client";
import { GymsRepoitory } from "../repoitories/gym-repository";

interface FetchNearbyGymsUserCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsUserCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUserCase {
	constructor(private gymsRepoitory: GymsRepoitory) {}

	async execute({ 
		userLatitude,
		userLongitude
	}: FetchNearbyGymsUserCaseRequest): Promise<FetchNearbyGymsUserCaseResponse> {
		const gyms = await this.gymsRepoitory.findManyNearby({latitude: userLatitude, longitude: userLongitude});
		return { gyms };
	}
}
