import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import * as admin from 'firebase-admin';
import * as path from 'path';
import { WebsocketGateway } from './websocket.gateway';
import { createImage } from './utils';

const serviceAccount = require(path.join(process.cwd(), 'nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // storageBucket: 'testerdemo-888a3.appspot.com',
  storageBucket: 'nodejs1-7a602.appspot.com',
});


// const bucketName = 'nodejs1-7a602.appspot.com';

// const storage = new Storage({
//   projectId: 'nodejs1-7a602',
//   keyFilename: 'nodejs1-7a602-firebase-adminsdk-td09f-fad664aec3.json',
// });


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

  async createImage(url: string, colorTone: string) {
    const imageBuffer = await createImage(url, colorTone);
    return imageBuffer;
  }

  async saveImageAndGetPublicUrl(imageBuffer: Buffer) {
    const bucket = admin.storage().bucket();
    const file = bucket.file(Date.now() + '.png');
    const options = {
      metadata: {
        contentType: 'image/png',
      },
      
    };

    return new Promise<string>((resolve, reject) => {
      file.save(imageBuffer, options, (err) => {
        if (err) {
          // reject('NoT ok');
          // return;
          reject('Failed to save image to Firebase Storage');
          console.error('Error saving image to Firebase Storage:', err);
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
            // reject('NOT ok');
            reject('Failed to get signed URL');
            console.error('Error getting signed URL:', error);
          });
      });
    });
  }

  getCount(): number {
    return this.connectedClients.length;
  }
}