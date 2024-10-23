import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './uploads/upload.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule, 
    UploadModule,
    ConfigModule.forRoot({
      isGlobal: true,

    }),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}