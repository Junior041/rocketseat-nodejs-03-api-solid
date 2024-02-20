import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "../repoitories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymnsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;
beforeEach(() => {
	gymnsRepository = new InMemoryGymsRepository();
	sut = new CreateGymUseCase(gymnsRepository);
});

describe("Create Gym Use Case", () => {
	it("should be able to create Gym", async () => {
		const { gym } = await sut.execute({
			title: "Gym Teste",
			description: "Teste de Criação de Academia",
			phone: "(99) 9 9999-9999",
			latitude: -27.2092052,
			longitude:-49.6401091,
		});
		expect(gym.id).toEqual(expect.any(String));
	});
});
