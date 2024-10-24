import { IsString, IsInt, IsBoolean } from 'class-validator';
import { ICreateUserInput } from '../interfaces/create-user-input.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInputDto implements ICreateUserInput {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsInt()
  age: number;

  @ApiProperty()
  @IsBoolean()
  isStudent: boolean;

  @ApiProperty()
  @IsString()
  password: string;
}
