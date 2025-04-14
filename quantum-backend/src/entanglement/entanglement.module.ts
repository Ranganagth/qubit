import { Module } from '@nestjs/common';
import { EntanglementController } from './entanglement.contoller';
import { EntanglementService } from './entanglement.service';

@Module({
  controllers: [EntanglementController],
  providers: [EntanglementService],
})
export class EntanglementModule {}
