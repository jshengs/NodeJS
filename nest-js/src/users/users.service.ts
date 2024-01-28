import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateMessageDto } from 'src/messages/dto/update-message.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "John",
            "email": "john@user.my",
            "role": "INTERN"
          },
          {
            "id": 2,
            "name": "Sam",
            "email": "sam@user.my",
            "role": "INTERN"
          },
          {
            "id": 3,
            "name": "Ei",
            "email": "ei@user.my",
            "role": "INTERN"
          },
          {
            "id": 4,
            "name": "Ken",
            "email": "ken@user.my",
            "role": "ENGINEER"
          },
          {
            "id": 5,
            "name": "Pru",
            "email": "pru@user.my",
            "role": "ENGINEER"
          }
        ]

        findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
            if(role){
                const rolesArray = this.users.filter(user => user.role === role)
                if(rolesArray.length === 0) throw new NotFoundException('User role not found')
                return rolesArray
                // return this.users.filter(user => user.role === role)
            }
            return this.users
        }

        findOne(id: number){
            const user = this.users.find(user => user.id === id)

            if(!user) throw new NotFoundException('User not found')
            return user
        }

        // create(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}){'
        create(createUserDto: CreateUserDto){
            const usersByHighestId = [...this.users].sort((a,b)=> b.id - a.id)
            const newUser = {
                id: usersByHighestId[0].id + 1,
                ...createUserDto
            }
            this.users.push(newUser)
            return newUser
        }

        // update(id: number, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}){//? is optional
            update(id: number, updateUserDto: UpdateUserDto){//? is optional
            this.users = this.users.map(user => {
                if (user.id === id){
                    return {...user, ...updateUserDto}
                }
                return user
            })

            return this.findOne(id)
        }

        delete(id: number){
            const removedUser = this.findOne(id)
            this.users = this.users.filter(user => user.id !== id)
            
            return removedUser
        }
}