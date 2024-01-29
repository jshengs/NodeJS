
import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { addTask } from './index'; // Assuming addTask is exported correctly
import { createImage } from './utils'; // Adjust the import path
import { getStorage } from 'firebase-admin/storage'; // Import getStorage specifically

@Controller()
export class AppController {
  private count = 0;

  @Get('/test')
  testEndpoint(@Query('email') email: string, @Res() res: Response) {
    if (connectedClients.length === 0) {
      res.send({
        status: 'error',
        message: 'no client connected',
      });
    } else {
      res.send('ok');
    }

    const _url = 'https://i.ibb.co/BnwTGtB/2023-11-24-154057.png';
    addTask(_url, email);
  }

  @Get('/')
  async root(@Query('url') url: string, @Query('colorTone') colorTone: string, @Res() res: Response) {
    if (url === undefined) {
      res.send({
        status: 'error',
        message: 'url is required',
      });
    }

    const _urll = url;

    const imageBuffer = await createImage(_urll, colorTone);

    const bucket = getStorage().bucket();

    const file = bucket.file('ck/' + Date.now() + '.png');
    const options = {
      metadata: {
        contentType: 'image/png',
      },
    };

    file.save(imageBuffer, options, function (err) {
      if (err) {
        res.send('not ok');
        return;
      }

      file
        .getSignedUrl({
          action: 'read',
          expires: '03-09-2491',
        })
        .then((signedUrls) => {
          res.send({
            status: 'ok',
            url: signedUrls[0],
          });
        });
    });
  }

  @Get('/count')
  getCount(@Res() res: Response) {
    this.count += 1;
    res.send(this.count.toString());
  }
}
