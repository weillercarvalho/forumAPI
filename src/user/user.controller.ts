import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import {
    Controller,
    Post,
    Body,
    Inject,
    Param,
    Put,
    Delete,
    Get,
} from '@nestjs/common';


@Controller('user')
export class UserController {
    @Inject()
    private readonly userService: UserService

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<UserModel> {
        try {
            return this.userService.user({ id: Number(id) })
        } catch (error) {
            console.error('Error:', error?.message)
        }
    }

    @Post('signup')
    async signupUser(
        @Body() userData: Prisma.UserCreateInput,
    ): Promise<UserModel> {
        try {
            return this.userService.createUser(userData);
        } catch (error) {
            console.error('Error:', error?.message)
        }

    }

    @Put('update')
    async updateUser(
        @Body() userData: Prisma.UserUpdateInput,
        @Param('id') id: string
    ): Promise<UserModel> {
        return this.userService.updateUser({ where: { id: Number(id) }, data: userData });
    }

    @Delete('delete')
    async deleteUser(
        @Param('id') id: string): Promise<UserModel> {
        return this.userService.deleteUser({ id: Number(id) })
    }
}
