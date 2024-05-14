import { Body, Controller,Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
    @Inject()
    private readonly authService: AuthService
    @Post('signin')
    async signIn(@Body() body: Prisma.UserCreateInput) {
        return this.authService.userSignIn(body)
    }
}
