import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { PrismaService } from './services/prisma/prisma.service'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.use(cookieParser())

  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'))
}
bootstrap()
