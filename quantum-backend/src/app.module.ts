import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QubitModule } from './qubit/qubit.module';
import { EntanglementModule } from './entanglement/entanglement.module';
import { InterferenceModule } from './interference/interference.module';

@Module({
  imports: [QubitModule, EntanglementModule, InterferenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
