import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateUserInput } from './interfaces/create-user-input.interface';
import { IUpdateUserPartialInput } from './interfaces/update-user-partial-input.interface';
import { IUpdateUserInput } from './interfaces/update-user-input.interface';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: ICreateUserInput): Promise<UserDocument> {
    const newUser = new this.userModel(dto);
    return newUser.save();
  }

  async findOne(firstName: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ firstName }).exec();
    if (!user) {
      throw new NotFoundException(`User with first name ${firstName} not found`);
    }
    return user;
  }

  async list(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  async findOneWithoutExeption(firstName: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ firstName }).exec();
  }

  async updatePartially(id: string, dto: IUpdateUserPartialInput): Promise<UserDocument> {
    const user = await this.findOneById(id);

    if (dto.hasOwnProperty('id')) {
      throw new UnprocessableEntityException('Updating the "id" field is not allowed');
    }

    Object.assign(user, dto);
    return user.save();
  }

  async update(id: string, dto: IUpdateUserInput): Promise<UserDocument> {
    const user = await this.findOneById(id);

    if (dto.hasOwnProperty('id')) {
      throw new UnprocessableEntityException('Updating the "id" field is not allowed');
    }

    Object.assign(user, dto);
    return user.save();
  }

  async remove(id: string): Promise<string> {
    await this.userModel.deleteOne({ _id: id });
    return `User with ID ${id} removed successfully`;
  }
}
