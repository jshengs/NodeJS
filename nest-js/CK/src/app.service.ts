import { Injectable } from '@nestjs/common';
import { getStorage } from 'firebase-admin/storage';
import { createImage } from './utils'; 
import * as admin from 'firebase-admin';


const path = require('path');
const serviceAccount = require (path.join(process.cwd(),'nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'testerdemo-888a3.appspot.com',

});

@Injectable()
export class AppService {
  private connectedClients: any[] = [];

  addClient(client: any) {
    this.connectedClients.push(client);
  }

  removeClient(client: any) {
    this.connectedClients = this.connectedClients.filter((c) => c !== client);
  }

  getConnectedClients() {
    return this.connectedClients;
  }

  addTask(task: string, email: string) {
    const sequence = this.connectedClients.length > 0 ? this.connectedClients.length : 1;
    const remaining = sequence % this.connectedClients.length;

    this.connectedClients.forEach((client, index) => {
      if (remaining === index) {
        client.send([task, sequence, remaining, index, email].toString());
      }
    });
  }

  async createImage(url: string) {
    const imageBuffer = await createImage(url);
    return imageBuffer;
  }

  async saveImageAndGetPublicUrl(imageBuffer: Buffer): Promise<string> {
    const bucket = getStorage().bucket();
    const file = bucket.file('ck/' + Date.now() + '.png');
    const options = {
      metadata: {
        contentType: 'image/png',
      },
    };

    return new Promise<string>((resolve, reject) => {
      file.save(imageBuffer, options, (err) => {
        if (err) {
          reject('not ok');
          return;
        }

        file.getSignedUrl({
          action: 'read',
          expires: '03-09-2491',
        })
          .then((urls) => {
            resolve(urls[0]);
          })
          .catch((error) => {
            reject('not ok');
          });
      });
    });
  }

  getCount(): number {
    return this.connectedClients.length;
  }

  
}