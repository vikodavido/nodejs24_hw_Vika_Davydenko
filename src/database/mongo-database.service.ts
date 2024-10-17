import { Injectable, OnModuleInit } from '@nestjs/common';
import { MongoClient, Db, Collection } from 'mongodb';
import { DatabaseModule } from './database.abstract';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoDatabaseService extends DatabaseModule implements OnModuleInit {
  private client: MongoClient;
  private db: Db;

  constructor(private configService: ConfigService) {
    super();
    // console.log('MONGODB_WRITE_CONNECTION_STRING', this.configService.get<string>('MONGODB_WRITE_CONNECTION_STRING'));
    const connectionString = this.configService.get<string>('MONGODB_WRITE_CONNECTION_STRING') || 'mongodb://root:qwerty@172.19.0.2:27017/nestdb?authSource=admin';

    // const connectionString = this.configService.get<string>('MONGODB_WRITE_CONNECTION_STRING') || 'mongodb://root:qwerty@mongo:27017/nestdb?authSource=admin';

    this.client = new MongoClient(connectionString);
  }

  async onModuleInit() {
    await this.connect();
  }
  
  public async connect(): Promise<void> {
    // console.log('Подключен:', this.client.isConnected());
    try {
      await this.client.connect();
      this.db = this.client.db('nestdb');
      console.log('Подключение к MongoDB установлено');
    } catch (error) {
      console.error('Ошибка подключения к MongoDB:', error);
      throw new Error('Не удалось подключиться к MongoDB');
    }
  }

  async disconnect(): Promise<void> {
    await this.client.close();
    console.log('Соединение с MongoDB закрыто');
  }

  async insertOne(table: string, data: any): Promise<void> {
    const collection: Collection = this.db.collection(table);
    await collection.insertOne(data);
  }

  async findOne<T>(table: string, query: any): Promise<T | null> {
    const collection: Collection = this.db.collection(table);
    return collection.findOne(query) as Promise<T | null>;
  }

  async updateOne(table: string, query: any, data: any): Promise<void> {
    const collection: Collection = this.db.collection(table);
    await collection.updateOne(query, { $set: data });
  }

  async deleteOne(table: string, query: any): Promise<void> {
    const collection: Collection = this.db.collection(table);
    await collection.deleteOne(query);
  }

  async findAll<T>(table: string): Promise<T[]> {
    const collection: Collection = this.db.collection(table);
    return collection.find().toArray() as Promise<T[]>;
  }
}
