import { Module } from '@nestjs/common'
import { PrismaService } from './services/prisma/prisma.service'
import { UsersController } from './services/users/users.controller'
import { UsersService } from './services/users/users.service'

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
})
export class AppModule {}
