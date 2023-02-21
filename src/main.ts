/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  app.use(cookieParser())
  const configService = app.get(ConfigService)
  const PORT = configService.get<string>('PORT')
  console.log("PORT", PORT);
  
  await app.listen(PORT)
}
bootstrap()
