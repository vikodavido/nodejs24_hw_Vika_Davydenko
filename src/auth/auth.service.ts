import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, 
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(firstName: string, password: string): Promise<any> {
    const user = await this.usersService.findOneWithoutException(firstName);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject(); 
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: IUser) {
    const payload = { firstName: user.firstName, sub: user.password }; 
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    });
    return {
      access_token: token,
    };
  }
}
