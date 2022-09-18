import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: Pick<User, 'email' | 'password'>) {
    return this.prisma.user.create({
      data: user,
      select: { email: true, id: true },
    })
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } })
  }

  get(id: number) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  update(id: number, updates: Partial<Pick<User, 'email' | 'password'>>) {
    return this.prisma.user.update({
      where: { id },
      data: updates,
      select: { email: true, id: true },
    })
  }
}
