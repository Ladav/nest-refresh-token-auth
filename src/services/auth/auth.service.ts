import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signIn(cred: Pick<User, 'email' | 'password'>, res: Response) {
    const user = await this.prisma.user.findFirst({
      where: { ...cred },
      select: { id: true, email: true },
    })

    const jwt = this.jwtService.sign(user)
    res.cookie('Authentication', jwt, { httpOnly: true, path: '/', sameSite: true, secure: true })
    res.send()
  }
}
