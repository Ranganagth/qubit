import { Controller, Post } from '@nestjs/common';
import { QubitService } from './qubit.service';

@Controller('qubit')
export class QubitController {
  constructor(private readonly qubitService: QubitService) {}

  @Post('measure')
  measureQubit() {
    return this.qubitService.measure();
  }
}
