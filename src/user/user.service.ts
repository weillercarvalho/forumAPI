import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    @Inject()
    private readonly prisma: PrismaService

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput
    ): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: userWhereUniqueInput
        })
        return user;
    }
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const saltOrRounds = 10;
        const { password }: Prisma.UserCreateInput = data;
        const hashPassword = await bcrypt.hash(password, saltOrRounds);
        return this.prisma.user.create({ data: { ...data, password: hashPassword } })
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        const update = await this.prisma.user.update({
            data,
            where,
        });
        return this.checking(update);
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        const del = await this.prisma.user.delete({
            where,
        });
        return this.checking(del);
    }

    checking (params: any) {
        if (!params) {
            throw new BadRequestException();
        }
        return params;
    }
}
