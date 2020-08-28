import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import cookieParser = require('cookie-parser')

const defaultPort = 4000
const port = process.env.PORT || defaultPort

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  app.enableCors({ origin: '*' })
  await app.listen(port, () =>
    console.log(`🚀 App listening on the port ${port}`),
  )
}

void bootstrap()
