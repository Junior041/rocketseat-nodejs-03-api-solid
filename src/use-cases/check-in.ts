import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repoitories/check-ins-repository";
import { GymsRepoitory } from "../repoitories/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberCheckInsError } from "./errors/max-number-off-check-ins";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}
interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}
export class CheckInUseCase {
	constructor(
		private checkInsRepository: CheckInsRepository,
		private gymsRepoitory: GymsRepoitory
	) {}
	async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymsRepoitory.findById(gymId);
		if (!gym) {
			throw new ResourceNotFoundError();
		}

		//calcular distancia entre user e gym
		const distance = getDistanceBetweenCoordinates(
			{latitude: userLatitude, longitude: userLongitude},
			{latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
		);
		const MAX_DISTANCE_IN_KILOMETERS = 0.1;
			
		if (distance > MAX_DISTANCE_IN_KILOMETERS) {
			throw new MaxDistanceError();
		}

		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

		if (checkInOnSameDay) {
			throw new MaxNumberCheckInsError();
		}

		const checkIn = await this.checkInsRepository.create({
			gym_id: gymId,
			user_id: userId,
		});

		return {
			checkIn,
		};
	}
}
