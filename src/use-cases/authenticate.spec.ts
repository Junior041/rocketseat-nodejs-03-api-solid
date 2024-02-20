import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repoitories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository : InMemoryUsersRepository;
let sut : AuthenticateUseCase;
beforeEach(() => {
	usersRepository = new InMemoryUsersRepository();
	sut = new AuthenticateUseCase(usersRepository);
});
describe("Authenticate Use Case", () => {
	it("should be able to authenticate", async () => {
		await usersRepository.create({
			name: "John Doe",
			email: "teste@teste.com",
			password_hash: await hash("1010101010", 6),
		});
		const {user} = await sut.execute({
			email: "teste@teste.com",
			password: "1010101010",
		});
		expect(user.id).toEqual(expect.any(String));
	});

	it("it should not be able to authenticate with wrong email", async () => {
		
		await expect(sut.execute({
			email: "teste@teste.com",
			password: "1010101010",
		})).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("it should not be able to authenticate with wrong password", async () => {
		await usersRepository.create({
			name: "John Doe",
			email: "teste@teste.com",
			password_hash: await hash("5555", 6),
		});
		await expect(sut.execute({
			email: "teste@teste.com",
			password: "1010101010",
		})).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
