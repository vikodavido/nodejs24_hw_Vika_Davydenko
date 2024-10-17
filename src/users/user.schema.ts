import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from './interfaces/user.interface';

@Schema()
export class User extends Document implements IUser {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  isStudent: boolean;

  @Prop({ required: true })
  password: string;

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
