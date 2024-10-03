import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LineNotifyService {
  private readonly LINE_NOTIFY_URL = 'https://notify-api.line.me/api/notify';
  private readonly accessToken: string; 

  constructor(private readonly httpService: HttpService,private readonly configService: ConfigService) { 
    this.accessToken = this.configService.get<string>('LINE_NOTIFY_ACCESS_TOKEN');
  }

  async sendNotification(message: string): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.LINE_NOTIFY_URL, new URLSearchParams({ message: message }), {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }),
      );

      if (response.status !== 200) {
        throw new HttpException('Failed to send notification', response.status);
      }
    } catch (error) {
      throw new HttpException('Error sending LINE Notify', 500);
    }
  }
}
