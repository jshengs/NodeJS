import { Injectable } from '@nestjs/common';
import { getStorage } from 'firebase-admin/storage';
import { createImage } from './utils';

@Injectable()
export class UtilsService {
  async createImage(url: string) {
    return createImage(url);
  }
}