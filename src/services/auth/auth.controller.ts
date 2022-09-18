import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() cred: Parameters<typeof this.authService.signIn>[0], @Res({ passthrough: true }) res: Response) {
    return this.authService.signIn(cred, res)
  }
}
