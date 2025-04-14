import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QubitModule } from './qubit/qubit.module';

@Module({
  imports: [QubitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
