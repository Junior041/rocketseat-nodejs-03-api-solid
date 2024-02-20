import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepoitory } from "../users-repository";

export class PrismaUsersRepository implements UsersRepoitory{
	async create(data: Prisma.UserUncheckedCreateInput){
		return await prisma.user.create({data});
	}
	async findByEmail(email: string) {
		return await prisma.user.findUnique({ where: { email } });
	}
	async findById(id: string){
		return await prisma.user.findUnique({ where: { id } });
	}
}