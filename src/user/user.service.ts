import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    @Inject()
    private readonly prisma: PrismaService

    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        const password: string = userWhereUniqueInput.password as string;

        const getUniqueUser = await this.prisma.user.findUnique({
            where: { email: userWhereUniqueInput.email }
        });

        if (!getUniqueUser) {
            throw new Error ("User not found!")
        }

        console.log(getUniqueUser.password);
        if (await bcrypt.compare(password, getUniqueUser.password)) {
            return getUniqueUser;
        } else {
            throw new Error ("Password doesn't match!")
        }
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
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}
