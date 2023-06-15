import { Module } from '@nestjs/common';
import { BelvoService } from './belvo.service';
import { BelvoController } from './belvo.controller';

@Module({
  providers: [ BelvoService ],
  controllers: [ BelvoController ],
  exports: [ BelvoService ]
})
export class BelvoModule {}
