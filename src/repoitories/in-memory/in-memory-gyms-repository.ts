import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepoitory } from "../gym-repository";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "../../utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements GymsRepoitory {
	public items: Gym[] = [];
	async create(data: Prisma.GymUncheckedCreateInput) {
		const gym: Gym = {
			id: data.id ?? randomUUID(),
			...data,
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Prisma.Decimal(data.latitude.toString()),
			longitude: new Prisma.Decimal(data.longitude.toString()),
		};
		this.items.push(gym);
		return gym;
	}
	async searchMany(query: string, page: number) {
		return this.items
			.filter(item => item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
			.slice((page - 1) * 20, page * 20);		
	}
	async findManyNearby(params: FindManyNearbyParams){
		return this.items.filter(item => {
			const distance = getDistanceBetweenCoordinates(
				{latitude: params.latitude,longitude: params.longitude},
				{latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber()}
			);
			return distance < 10; // 10 Quilometros
		});
	}
	async findById(id: string) {
		const user = this.items.find((item) => item.id === id);

		if (!user) {
			return null;
		}
		return user;
	}
}
