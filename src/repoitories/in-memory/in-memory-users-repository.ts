import { Prisma, User } from "@prisma/client";
import { UsersRepoitory } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepoitory {
	public items: User[] = [];
	async findById(id: string) {
		const user = this.items.find((item) => item.id === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async create(data: Prisma.UserUncheckedCreateInput) {
		const user = {
			id: randomUUID(),
			...data,
			created_at: new Date(),
		};
		this.items.push(user);
		return user;
	}
	async findByEmail(email: string) {
		const user = this.items.find((item) => item.email == email);
		return user || null;
	}
}
