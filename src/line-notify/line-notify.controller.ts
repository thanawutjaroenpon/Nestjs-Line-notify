import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Put, Query } from '@nestjs/common';
import { LineNotifyService } from './line-notify.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@Controller('line')
@ApiTags('ไลน์')
export class LineNotifyController {
  constructor(private readonly linenotifyService: LineNotifyService) {}

  @Post('test')
  @ApiBody({
    description: 'Message to be sent via LINE Notify',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Hello from NestJS!', 
        },
      },
      required: ['message'], 
    },
  })
  async send(@Body() body: { message: string }) {
    const { message } = body; 
    await this.linenotifyService.sendNotification(message);
    return { message: 'Notification sent successfully!' };
  }

}
