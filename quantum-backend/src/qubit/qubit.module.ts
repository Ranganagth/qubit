import { Module } from '@nestjs/common';
import { QubitService } from './qubit.service';
import { QubitController } from './qubit.controller';

@Module({
  providers: [QubitService],
  controllers: [QubitController]
})
export class QubitModule {}
