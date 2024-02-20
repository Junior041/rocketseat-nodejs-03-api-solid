import { Gym } from "@prisma/client";
import { GymsRepoitory } from "../repoitories/gym-repository";

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
	constructor(private gymsRepoitory: GymsRepoitory) {}

	async execute({ 
		title,
		description,
		phone, 
		latitude, 
		longitude 
	}: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
		const gym = await this.gymsRepoitory.create({
			title,
			description,
			phone,
			latitude,
			longitude,
		});
		return { gym };
	}
}
