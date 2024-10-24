import { IsBoolean, IsInt, IsString, IsOptional } from 'class-validator';
import { IUpdateUserInput } from '../interfaces/update-user-input.interface';

export class UpdateUserInputDto implements IUpdateUserInput {
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
