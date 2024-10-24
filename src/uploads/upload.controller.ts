import { Controller, Post, UploadedFile, UseInterceptors, Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { File } from './file.schema'; 


@Controller('upload')
export class UploadController {
  private readonly logger = new Logger(UploadController.name);

  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      this.logger.error('No file uploaded');
      return { message: 'No file uploaded' };
    }

    const fileData: Partial<File> = {
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
    };

    await this.uploadService.saveFile(fileData); 

    return {
      message: 'File uploaded successfully!',
      filePath: `/uploads/${file.filename}`,
    };
  }
}
