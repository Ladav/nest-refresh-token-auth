import { NestFactory } from '@nestjs/core'
import { PrismaService } from './services/prisma/prisma.service'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  await app.listen(process.env.PORT)
}
bootstrap()
