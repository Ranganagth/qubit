import { Controller, Get, Query } from '@nestjs/common';
import { InterferenceService } from './interference.service';

@Controller('quantum')
export class InterferenceController {
  constructor(private readonly interferenceService: InterferenceService) {}

  @Get('interference')
  simulateInterference(@Query('noise') noise: number): { state: number } {
    return { state: this.interferenceService.simulateDoubleHadamard(Number(noise)) };
  }

  @Get('custom-gates')
  simulateCustomGates(@Query('gates') gatesStr: string): { state: number } {
    const gates = gatesStr.split(',');
    return { state: this.interferenceService.simulateWithGates(gates) };
  }
}