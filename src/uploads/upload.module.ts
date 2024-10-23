import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service'; 
import { DatabaseModule } from '../database/database.module';
import { MongoDatabaseService } from '../database/mongo-database.service'; 

@Module({
  imports: [DatabaseModule],
  controllers: [UploadController],
  providers: [UploadService, MongoDatabaseService],
})
export class UploadModule {}
