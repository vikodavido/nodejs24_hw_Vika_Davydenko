export abstract class DatabaseModule {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract insertOne(table: string, data: any): Promise<void>;
  abstract findOne<T>(table: string, query: any): Promise<T>;
  abstract updateOne(table: string, query: any, data: any): Promise<void>;
  abstract deleteOne(table: string, query: any): Promise<void>;
  abstract findAll<T>(table: string): Promise<T[]>;
}
