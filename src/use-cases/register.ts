import { hash } from "bcryptjs";
import { UsersRepoitory } from "../repoitories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface registerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse{
	user: User
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepoitory) {}

	async execute({ email, name, password }: registerUseCaseRequest): Promise<RegisterUseCaseResponse> {
		const password_hash = await hash(password, 5);

		const userWithSameEmail = await this.usersRepository.findByEmail(email);
		if (userWithSameEmail) {
			throw new UserAlreadyExistsError();
		}
		const user = await this.usersRepository.create({ email, name, password_hash });
		return { user };
	}
}
