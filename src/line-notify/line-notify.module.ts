import { Module } from '@nestjs/common';
import { LineNotifyService } from './line-notify.service';
import { LineNotifyController } from './line-notify.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [LineNotifyController],
  providers: [LineNotifyService],
})
export class LineNotifyModule {}
