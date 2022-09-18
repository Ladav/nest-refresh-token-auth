import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/client'
import { UsersService } from '../users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(payload: Omit<User, 'password'>) {
    const user = await this.usersService.get(payload.id)
    if (!user) {
      throw new UnauthorizedException('Compromised token detected')
    }
    return payload
  }
}
