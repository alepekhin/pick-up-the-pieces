import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'

const defaultPort = 4000
const port = process.env.PORT || defaultPort

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  await app.listen(port, () =>
    console.log(`🚀 App listening on the port ${port}`),
  )
}

void bootstrap()
