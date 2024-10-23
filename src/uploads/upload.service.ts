import { Injectable } from '@nestjs/common';
import { MongoDatabaseService } from '../database/mongo-database.service'; 
import { File } from './file.schema'; 

@Injectable()
export class UploadService {
  constructor(private readonly mongoDatabaseService: MongoDatabaseService) {}

  async saveFile(fileData: Partial<File>): Promise<void> {
    await this.mongoDatabaseService.insertOne('files', fileData);
  }
}
