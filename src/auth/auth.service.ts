import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(firstName: string, password: string): Promise<any> {
    const user = await this.usersService.findOneWithoutExeption(firstName);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: IUser) {
    const payload = { firstName: user.firstName, sub: user.id }; 
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'), // Используем переменную окружения
    });
    return {
      access_token: token,
    };
  }
}