import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import {UsersService} from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){

    }

    @SkipThrottle({default: false})
    @Get() //GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.usersService.findAll(role);
    }

    @Throttle({short: {ttl: 1000, limit: 1}})
    @Get(':id') //GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number){ //Param is string
        // return { id }
        return this.usersService.findOne(+id) //Unary plus + THIS CONVERT IT INTO A NUMBER

    }

    @Post() //POST /users
    // create(@Body() user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
        create(@Body(ValidationPipe) createUserDto: CreateUserDto){

        return this.usersService.create(createUserDto)

    }

    @Patch(':id') //PATCH /users/:id
    // update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate:{ name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
        update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto : UpdateUserDto){
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') //DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id)
    }
}