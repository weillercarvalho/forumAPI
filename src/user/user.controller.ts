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

    @Get()
    async getUser(@Param('id') id :string) : Promise<UserModel> {
        try {
            return this.userService.user({id: Number(id)})
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
    @Post('signin')
    async signinUser(
        @Body() userData: Prisma.UserWhereUniqueInput,
    ): Promise<UserModel> {
        try {
            return this.userService.userSingIn(userData);
        } catch (error) {
            console.error('Error:', error?.message)
        }
    }

    @Put('update')
    async updateUser(
        @Body() userData: Prisma.UserUpdateInput,
        @Param('id') id: string
    ): Promise<UserModel> {
        try {
            return this.userService.updateUser({ where: { id: Number(id) }, data: userData });
        } catch (error) {
            console.error('Error:', error?.message)
        }
    }

    @Delete('delete')
    async deleteUser(
        @Param('id') id: string): Promise<UserModel> {
            try {
                return this.userService.deleteUser({id: Number(id)})
            } catch (error) {
                console.error('Error:', error?.message)
            }
            
    }
}
