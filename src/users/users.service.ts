import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { MongoDatabaseService } from '../database/mongo-database.service';
import { ICreateUserInput } from './interfaces/create-user-input.interface';
import { IUpdateUserPartialInput } from './interfaces/update-user-partial-input.interface';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly dbConnection: MongoDatabaseService) {}

  async create(dto: ICreateUserInput): Promise<void> {
    await this.dbConnection.insertOne('users', dto);
  }

  async list(): Promise<User[]> {
    return await this.dbConnection.findAll<User>('users');
  }

  async findOne(firstName: string): Promise<User> {
    const user = await this.dbConnection.findOne<User>('users', { firstName });
    if (!user) {
      throw new NotFoundException(`User with first name ${firstName} not found`);
    }
    return user;
  }

  async findOneWithoutException(firstName: string): Promise<User | null> {
    return await this.dbConnection.findOne<User>('users', { firstName });
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.dbConnection.findOne<User>('users', { _id: id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async updateOne(id: string, dto: IUpdateUserPartialInput): Promise<User> {
    await this.dbConnection.updateOne('users', { _id: id }, dto);
    return await this.findOneById(id);
  }

  async updatePartially(id: string, dto: IUpdateUserPartialInput): Promise<void> {
    if (dto.hasOwnProperty('id')) {
      throw new UnprocessableEntityException('Updating the "id" field is not allowed');
    }

    await this.dbConnection.updateOne('users', { _id: id }, dto);
  }

  async remove(id: string): Promise<string> {
    await this.dbConnection.deleteOne('users', { _id: id });
    return `User with ID ${id} removed successfully`;
  }
}
