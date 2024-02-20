import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repoitories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;
beforeEach(() => {
	usersRepository = new InMemoryUsersRepository();
	sut = new RegisterUseCase(usersRepository);
});

describe("Register Use Case", () => {
	it("should hash user password upon registration", async () => {
		const password = "1010101010";
		const { user } = await sut.execute({
			email: "teste@teste.com",
			name: "teste",
			password,
		});
		const isPasswordCorrectlyHashed = await compare(password, user.password_hash);
		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it("should not be able to register with same email twice", async () => {
		const email = "teste@teste.com";
		await sut.execute({
			email,
			name: "teste",
			password: "1010101010",
		});
		await expect(
			sut.execute({
				email,
				name: "teste",
				password: "1010101010",
			})
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it("should be able to register", async () => {
		const email = "teste@teste.com";
		const { user } = await sut.execute({
			email,
			name: "teste",
			password: "1010101010",
		});
		expect(user.id).toEqual(expect.any(String));
	});
});
