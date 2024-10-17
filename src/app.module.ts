import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true,

    }),
    DatabaseModule
    // MongooseModule.forRoot(process.env.MONGODB_WRITE_CONNECTION_STRING)

  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}