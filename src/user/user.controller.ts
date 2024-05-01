import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import {
    Controller,
    Post,
    Body,
    Inject,
  } from '@nestjs/common';


@Controller('user')
export class UserController {
@Inject()
private readonly userService: UserService
    @Post('signup')
    async signupUser(
        @Body() userData: Prisma.UserCreateInput,
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }
    @Post('signin')
    async signinUser(
        @Body() userData: Prisma.UserWhereUniqueInput,
    ): Promise<UserModel> {
        try {
            return this.userService.user(userData);
        } catch (error) {
            console.error('Error:', error?.message)
        }
    }
}
