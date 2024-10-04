import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';


@Injectable()
export class UsersService {
    private users: IUser[] = [];
    private idCounter = 1;

    create(createUserDto: CreateUserDto) {
        const newUser: IUser = { id: this.idCounter++, ...createUserDto };
        this.users.push(newUser);
        return newUser;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const user = this.findOne(id);
        Object.assign(user, updateUserDto);
        return user;
    }

    remove(id: number) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        this.users.splice(userIndex, 1);
    }
}
