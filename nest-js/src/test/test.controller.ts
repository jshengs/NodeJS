// Controller: 
// To define routes for creating, updating, deleting, 
// and retrieving tasks. Use decorators like “@Get,” “@Post,” “@Put,” 
// and “@Delete” to specify the HTTP methods and paths.


import { Controller, Get, Param, Query, Body, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import {Test} from '../entities/test.entity';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('test')

@Controller('test') //localhost:3000/test
export class TestController {
    constructor(private testService: TestService){

    }
    
    @ApiOkResponse({type: Test, isArray: true})
    @ApiQuery({name: 'name', required: false})
    @Get() //if here got '/___' then include in localhost:3000/test/___
    getTest(@Query('name')name: string): Test[] {
        return this.testService.findAll(name);
    }
    
    @ApiOkResponse({type: Test})
    @ApiNotFoundResponse()
    @Get(':id')
    getUserById(@Param('id') id: string): Test{
        return this.testService.findById(Number(id));
    }

    @ApiCreatedResponse({type: Test})
    @Post()
    createTest(@Body() body: CreateTestDto): Test{
        return this.testService.createTest(body);
    }
}