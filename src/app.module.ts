import { AuthService } from './services/auth/auth.service'
import { AuthController } from './services/auth/auth.controller'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as joi from 'joi'
import { PrismaService } from './services/prisma/prisma.service'
import { UsersController } from './services/users/users.controller'
import { UsersService } from './services/users/users.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './services/auth/jwt.startegy'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.string().required(),
        DATABASE_URL: joi.string().required(),
        JWT_SECRET: joi.string().required(),
        JWT_EXPIRY: joi.string().required(),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [PrismaService, UsersService, AuthService, JwtStrategy],
})
export class AppModule {}
