import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  testEndpoint(@Query('email') email: string, @Res() res: Response) {
   
   
    // 
    // 
    // 

  }

  @Get('/')
  async root(@Query('url') url: string, @Query('colorTone') colorTone: string, @Query('email') email: string, @Res() res: Response) {
    
    if (url === undefined || email === undefined) {
      res.send({
        status: 'error',
        message: 'url and email are required',
      });
      return;
    }

    const _urll =
      url ??
      'https://firebasestorage.googleapis.com/v0/b/testerdemo-888a3.appspot.com/o/cktest-sg%2Fd7cc432c1fa7470d8a818c74466ce548.png?alt=media&token=6dd322ea-19e0-4583-855c-d31223aff413';

    const imageBuffer = await this.appService.createImage(_urll, colorTone);

    const publicUrl = await this.appService.saveImageAndGetPublicUrl(imageBuffer);

    res.send({
      status: 'ok',
      url: publicUrl,
    });
  }
}