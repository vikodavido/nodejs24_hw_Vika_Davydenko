import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';
import { IUpdateUserPartialInput } from '../interfaces/update-user-partial-input.interface';

export class UpdateUserPartialInputDto implements IUpdateUserPartialInput {
  @IsString()
  @IsOptional()
  firstName?: string; 

  @IsString()
  @IsOptional()
  lastName?: string; 

  @IsInt()
  @IsOptional()
  age?: number;

  @IsBoolean()
  @IsOptional()
  isStudent?: boolean; 

  @IsString()
  @IsOptional()
  password?: string; 
}
