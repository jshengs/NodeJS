// Module: 
// To encapsulate all features related 
// to task management. This module will import necessary dependencies and 
// declare controllers and providers (services).

import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
