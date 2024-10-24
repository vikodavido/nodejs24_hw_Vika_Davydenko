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
    const connectionString = this.configService.get<string>('MONGODB_WRITE_CONNECTION_STRING') || 'mongodb://root:qwerty@172.19.0.2:27017/nestdb?authSource=admin';
    this.client = new MongoClient(connectionString);
  }

  async onModuleInit() {
    await this.connect();
  }
  
  public async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db('nestdb');
      console.log('Connection to MongoDB established');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('Failed to connect to MongoDB');
    }
  }

  async disconnect(): Promise<void> {
    await this.client.close();
    console.log('MongoDB connection closed');
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
