import { Module } from '@nestjs/common';
import { InterferenceController } from './interference.controller';
import { InterferenceService } from './interference.service';

@Module({
  controllers: [InterferenceController],
  providers: [InterferenceService],
})
export class InterferenceModule {}